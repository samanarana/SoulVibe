from flask import Blueprint, request
from app.models import Meditation, db
from flask_login import current_user, login_required

meditation_routes = Blueprint('meditation', __name__)

# Fetch all meditation entries for the authenticated user
@meditation_routes.route('/', methods=['GET'])
@login_required
def get_meditation_entries():
    user_meditation = Meditation.query.filter_by(userId=current_user.id).all()
    return {'meditation': [entry.to_dict() for entry in user_meditation]}


# Create a new meditation entry for the authenticated user
@meditation_routes.route('/', methods=['POST'])
@login_required
def create_meditation_entry():
    data = request.json
    new_meditation = Meditation(
        userId=current_user.id,
        date=data['date'],
        duration=data['duration'],
        meditation_type=data['meditation_type']
    )
    db.session.add(new_meditation)
    db.session.commit()
    return new_meditation.to_dict(), 201


# Fetch, Update, and Delete a specific meditation entry
@meditation_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_meditation_entry(id):
    meditation_entry = Meditation.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not meditation_entry or meditation_entry.userId != current_user.id:
        return ('Meditation entry not found', 404)

    # Fetch a specific meditation entry
    if request.method == 'GET':
        return meditation_entry.to_dict()

    # Update a specific meditation entry
    elif request.method == 'PUT':
        data = request.json
        meditation_entry.date = data.get('date', meditation_entry.date)
        meditation_entry.duration = data.get('duration', meditation_entry.duration)
        meditation_entry.meditation_type = data.get('meditation_type', meditation_entry.meditation_type)
        db.session.commit()
        return meditation_entry.to_dict()

    # Delete a specific meditation entry
    elif request.method == 'DELETE':
        db.session.delete(meditation_entry)
        db.session.commit()
        return ('Meditation entry deleted', 204)
