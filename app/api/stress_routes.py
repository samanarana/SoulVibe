from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import Stress, db
from flask_login import current_user, login_required

stress_routes = Blueprint('stress', __name__)

# Fetch all stress entries for the authenticated user
@stress_routes.route('/', methods=['GET'])
@login_required
def get_stress_entries():
    user_stress = Stress.query.filter_by(userId=current_user.id).all()
    return {'stress': [entry.to_dict() for entry in user_stress]}

# Create a new stress entry for the authenticated user
@stress_routes.route('/', methods=['POST'])
@login_required
def create_stress_entry():
    data = request.json
    new_stress = Stress(
        userId=current_user.id,
        date=datetime.strptime(data['date'], "%Y-%m-%d").date(),
        stress_level=data['stress_level'],
        personal_relationships=data['personal_relationships'],
        physical_symptoms=data['physical_symptoms'],
        exercise_frequency=data['exercise_frequency'],
        nutrition_habits=data['nutrition_habits'],
        relaxation_activities=data['relaxation_activities']
    )
    db.session.add(new_stress)
    db.session.commit()
    return new_stress.to_dict(), 201

# Fetch, Update, and Delete a specific stress entry
@stress_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_stress_entry(id):
    stress_entry = Stress.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not stress_entry or stress_entry.userId != current_user.id:
        return jsonify(message='Stress entry not found'), 404

    # Fetch a specific stress entry
    if request.method == 'GET':
        return stress_entry.to_dict()

    # Update a specific stress entry
    elif request.method == 'PUT':
        data = request.json
        stress_entry.date = datetime.strptime(data.get('date', stress_entry.date), "%Y-%m-%d").date()
        stress_entry.stress_level = data.get('stress_level', stress_entry.stress_level)
        stress_entry.personal_relationships = data.get('personal_relationships', stress_entry.personal_relationships)
        stress_entry.physical_symptoms = data.get('physical_symptoms', stress_entry.physical_symptoms)
        stress_entry.exercise_frequency = data.get('exercise_frequency', stress_entry.exercise_frequency)
        stress_entry.nutrition_habits = data.get('nutrition_habits', stress_entry.nutrition_habits)
        stress_entry.relaxation_activities = data.get('relaxation_activities', stress_entry.relaxation_activities)
        db.session.commit()
        return stress_entry.to_dict()

    # Delete a specific stress entry
    elif request.method == 'DELETE':
        db.session.delete(stress_entry)
        db.session.commit()
        return jsonify(message='Stress entry deleted'), 200
