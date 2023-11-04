from flask import Blueprint, request
from app.models import Journal, db
from flask_login import current_user, login_required

journal_routes = Blueprint('journals', __name__)


# Fetch all journal entries from all users
@journal_routes.route('/all', methods=['GET'])
def get_all_journals():
    all_journals = Journal.query.all()
    return {'journals': [journal.to_dict() for journal in all_journals]}


# Fetch all journal entries for the authenticated user
@journal_routes.route('/', methods=['GET'])
@login_required
def get_journals():
    user_journals = Journal.query.filter_by(userId=current_user.id).all()
    return {'journals': [journal.to_dict() for journal in user_journals]}


# Create a new journal entry for the authenticated user
@journal_routes.route('/', methods=['POST'])
@login_required
def create_journal():
    data = request.json
    new_journal = Journal(
        userId=current_user.id,
        date=data['date'],
        content=data['content'],
        mood_emoji=data['mood_emoji']
    )
    db.session.add(new_journal)
    db.session.commit()
    return new_journal.to_dict(), 201


# Fetch, Update, and Delete a specific journal entry
@journal_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_journal(id):
    journal = Journal.query.get(id)

    # Ensure the journal exists and belongs to the current user
    if not journal or journal.userId != current_user.id:
        return ('Journal entry not found', 404)

    # Fetch a specific journal entry
    if request.method == 'GET':
        return journal.to_dict()

    # Update a specific journal entry
    elif request.method == 'PUT':
        data = request.json
        journal.date = data.get('date', journal.date)
        journal.content = data.get('content', journal.content)
        journal.mood_emoji = data.get('mood_emoji', journal.mood_emoji)
        db.session.commit()
        return journal.to_dict()

    # Delete a specific journal entry
    elif request.method == 'DELETE':
        db.session.delete(journal)
        db.session.commit()
        return ('Journal entry deleted', 204)
