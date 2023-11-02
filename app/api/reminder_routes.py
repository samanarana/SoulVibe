from flask import Blueprint, request
from app.models import Reminder, db
from flask_login import current_user, login_required

reminder_routes = Blueprint('reminders', __name__)

# Fetch all reminders for the authenticated user
@reminder_routes.route('/', methods=['GET'])
@login_required
def get_reminders():
    user_reminders = Reminder.query.filter_by(userId=current_user.id).all()
    return {'reminders': [reminder.to_dict() for reminder in user_reminders]}

# Create a new reminder for the authenticated user
@reminder_routes.route('/', methods=['POST'])
@login_required
def create_reminder():
    data = request.json
    new_reminder = Reminder(
        userId=current_user.id,
        type=data['type'],
        content=data['content'],
        scheduled_at=data['scheduled_at']
    )
    db.session.add(new_reminder)
    db.session.commit()
    return new_reminder.to_dict(), 201

# Fetch, Update, and Delete a specific reminder
@reminder_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_reminder(id):
    reminder_entry = Reminder.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not reminder_entry or reminder_entry.userId != current_user.id:
        return ('Reminder not found', 404)

    # Fetch a specific reminder
    if request.method == 'GET':
        return reminder_entry.to_dict()

    # Update a specific reminder
    elif request.method == 'PUT':
        data = request.json
        reminder_entry.type = data.get('type', reminder_entry.type)
        reminder_entry.content = data.get('content', reminder_entry.content)
        reminder_entry.scheduled_at = data.get('scheduled_at', reminder_entry.scheduled_at)
        db.session.commit()
        return reminder_entry.to_dict()

    # Delete a specific reminder
    elif request.method == 'DELETE':
        db.session.delete(reminder_entry)
        db.session.commit()
        return ('Reminder deleted', 204)
