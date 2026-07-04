import os
from datetime import datetime
from flask import Flask, request, jsonify
import pymysql
from pymysql.err import MySQLError

app = Flask(__name__)

DB_CONFIG = {
    'host': os.getenv('DB_HOST', '127.0.0.1'),
    'user': os.getenv('DB_USER', 'mentoruser'),
    'password': os.getenv('DB_PASSWORD', 'mentorpass'),
    'database': os.getenv('DB_NAME', 'mentorapp'),
    'connect_timeout': 5,
    'cursorclass': pymysql.cursors.DictCursor,
}

DEFAULT_MENTORS = [
    {
        'id': 1,
        'name': 'Amina Ndiaye',
        'filiere': 'Intelligence Artificielle',
        'subjects': ['Mathématiques fondamentales', 'Programmation python', 'Machine Learning', 'Vision par ordinateur'],
        'availabilities': ['09:00', '14:00', '17:30'],
        'format': 'En ligne'
    },
    {
        'id': 2,
        'name': 'Jean Dupont',
        'filiere': 'Système Embarqué & IoT',
        'subjects': ['Programmation python', 'Systèmes embarqués en entreprise', 'Programmation système, réseau et temps réel', 'Électricité et électronique'],
        'availabilities': ['10:00', '15:30'],
        'format': 'Présentiel'
    },
    {
        'id': 3,
        'name': 'Sophie Martin',
        'filiere': 'Sécurité Informatique',
        'subjects': ['Cryptographie', 'Sécurité des réseaux', 'Pentesting', 'Sécurité applicative'],
        'availabilities': ['11:00', '18:00'],
        'format': 'Les deux'
    }
]


def get_db_connection():
    return pymysql.connect(**DB_CONFIG)


def load_mentors_from_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, filiere, subjects, availabilities, format FROM mentors')
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        mentors = []
        for row in rows:
            mentors.append({
                'id': row['id'],
                'name': row['name'],
                'filiere': row['filiere'],
                'subjects': [s.strip() for s in row['subjects'].split(',') if s.strip()],
                'availabilities': [s.strip() for s in row['availabilities'].split(',') if s.strip()],
                'format': row['format']
            })
        return mentors
    except MySQLError:
        return None


def time_to_minutes(time_str):
    try:
        dt = datetime.strptime(time_str, '%H:%M')
        return dt.hour * 60 + dt.minute
    except Exception:
        return None


def format_matches(requested_format, mentor_format):
    if not requested_format:
        return True
    normalized = mentor_format.strip().lower()
    requested = requested_format.strip().lower()
    if requested == 'en ligne':
        return normalized in ['en ligne', 'les deux']
    if requested == 'présentiel':
        return normalized in ['présentiel', 'les deux']
    if requested == 'les deux':
        return True
    return requested == normalized


def match_mentors(subjects, time, filiere, format_option):
    mentors = load_mentors_from_db() or DEFAULT_MENTORS
    requested_subjects = [s.strip().lower() for s in subjects if s and s.strip()]
    time_minutes = time_to_minutes(time)
    results = []

    for mentor in mentors:
        common_subjects = [s for s in mentor['subjects'] if s.lower() in requested_subjects]
        if requested_subjects and not common_subjects:
            continue

        if filiere and mentor['filiere'].lower() != filiere.lower():
            continue

        if format_option and not format_matches(format_option, mentor['format']):
            continue

        if time_minutes is not None:
            avail_match = any(
                abs(time_to_minutes(slot) - time_minutes) <= 60
                for slot in mentor['availabilities']
            )
            if not avail_match:
                continue

        score = 0
        if requested_subjects:
            score = round((len(common_subjects) / len(requested_subjects)) * 100)

        results.append({
            'id': mentor['id'],
            'name': mentor['name'],
            'filiere': mentor['filiere'],
            'format': mentor['format'],
            'availabilities': mentor['availabilities'],
            'common_subjects': common_subjects,
            'score': score
        })

    results.sort(key=lambda x: x['score'], reverse=True)
    return results


@app.route('/api/match', methods=['POST'])
def api_match():
    payload = request.get_json() or {}
    subjects = payload.get('subjects', [])
    time = payload.get('time', '')
    filiere = payload.get('filiere', '')
    format_option = payload.get('format', '')

    results = match_mentors(subjects, time, filiere, format_option)
    return jsonify({'results': results})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
