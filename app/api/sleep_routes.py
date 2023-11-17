from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import Sleep, db
from flask_login import current_user, login_required

sleep_routes = Blueprint('sleep', __name__)

# Fetch all sleep entries for the authenticated user
@sleep_routes.route('/', methods=['GET'])
@login_required
def get_sleep_entries():
    user_sleep = Sleep.query.filter_by(userId=current_user.id).all()
    return {'sleep': [entry.to_dict() for entry in user_sleep]}

# Create a new sleep entry for the authenticated user
@sleep_routes.route('/', methods=['POST'])
@login_required
def create_sleep_entry():
    data = request.json
    new_sleep = Sleep(
        userId=current_user.id,
        date=datetime.strptime(data['date'], "%Y-%m-%d").date(),
        sleep_duration=data['sleep_duration'],
        quality_of_sleep=data['quality_of_sleep']
    )
    db.session.add(new_sleep)
    db.session.commit()
    return new_sleep.to_dict(), 201


# Fetch, Update, and Delete a specific sleep entry
@sleep_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_sleep_entry(id):
    sleep_entry = Sleep.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not sleep_entry or sleep_entry.userId != current_user.id:
        return jsonify(message='Sleep entry not found'), 404

    # Fetch a specific sleep entry
    if request.method == 'GET':
        return sleep_entry.to_dict()

    # Update a specific sleep entry
    elif request.method == 'PUT':
        data = request.json
        sleep_entry.date = datetime.strptime(data.get('date', sleep_entry.date), "%Y-%m-%d").date()
        sleep_entry.sleep_duration = data.get('sleep_duration', sleep_entry.sleep_duration)
        sleep_entry.quality_of_sleep = data.get('quality_of_sleep', sleep_entry.quality_of_sleep)
        db.session.commit()
        return sleep_entry.to_dict()

    # Delete a specific sleep entry
    elif request.method == 'DELETE':
        db.session.delete(sleep_entry)
        db.session.commit()
        return jsonify(message='Sleep entry deleted'), 200
