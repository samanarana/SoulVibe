from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import Exercise, db
from flask_login import current_user, login_required

exercise_routes = Blueprint('exercises', __name__)


# Fetch all exercise entries from all users
@exercise_routes.route('/all', methods=['GET'])
def get_all_exercise_entries():
    all_exercises = Exercise.query.all()
    return {'exercise': [entry.to_dict() for entry in all_exercises]}


# Fetch all exercise entries for the authenticated user
@exercise_routes.route('/', methods=['GET'])
@login_required
def get_exercise_entries():
    user_exercise = Exercise.query.filter_by(userId=current_user.id).all()
    return {'exercise': [entry.to_dict() for entry in user_exercise]}


# Create a new exercise entry for the authenticated user
@exercise_routes.route('/', methods=['POST'])
@login_required
def create_exercise_entry():
    data = request.json
    date_str = data['date']
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

    new_exercise = Exercise(
        userId=current_user.id,
        date=date_obj,
        exercise_type=data['exercise_type'],
        duration=data['duration'],
        intensity=data['intensity']
    )
    db.session.add(new_exercise)
    db.session.commit()
    return new_exercise.to_dict(), 201


# Fetch, Update, and Delete a specific exercise entry
@exercise_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_exercise_entry(id):
    exercise_entry = Exercise.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not exercise_entry or exercise_entry.userId != current_user.id:
        return ('Exercise entry not found', 404)

    # Fetch a specific exercise entry
    if request.method == 'GET':
        return exercise_entry.to_dict()

    # Update a specific exercise entry
    elif request.method == 'PUT':
        data = request.json
        date_str = data.get('date', None)
        if date_str:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            exercise_entry.date = date_obj

        exercise_entry.exercise_type = data.get('exercise_type', exercise_entry.exercise_type)
        exercise_entry.duration = data.get('duration', exercise_entry.duration)
        exercise_entry.intensity = data.get('intensity', exercise_entry.intensity)
        db.session.commit()
        return exercise_entry.to_dict()

    # Delete a specific exercise entry
    elif request.method == 'DELETE':
        db.session.delete(exercise_entry)
        db.session.commit()
        return jsonify(message='Exercise entry deleted'), 200
