from flask import Blueprint, request
from app.models import Nutrition, db
from flask_login import current_user, login_required

nutrition_routes = Blueprint('nutrition', __name__)

# Fetch all nutrition entries for the authenticated user
@nutrition_routes.route('/', methods=['GET'])
@login_required
def get_nutrition_entries():
    user_nutrition = Nutrition.query.filter_by(userId=current_user.id).all()
    return {'nutrition': [entry.to_dict() for entry in user_nutrition]}

# Create a new nutrition entry for the authenticated user
@nutrition_routes.route('/', methods=['POST'])
@login_required
def create_nutrition_entry():
    data = request.json
    new_nutrition = Nutrition(
        userId=current_user.id,
        date=data['date'],
        meal_type=data['meal_type']
    )
    db.session.add(new_nutrition)
    db.session.commit()
    return new_nutrition.to_dict(), 201


# Fetch, Update, and Delete a specific nutrition entry
@nutrition_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_nutrition_entry(id):
    nutrition_entry = Nutrition.query.get(id)

    # Ensure the entry exists and belongs to the current user
    if not nutrition_entry or nutrition_entry.userId != current_user.id:
        return ('Nutrition entry not found', 404)

    # Fetch a specific nutrition entry
    if request.method == 'GET':
        return nutrition_entry.to_dict()

    # Update a specific nutrition entry
    elif request.method == 'PUT':
        data = request.json
        nutrition_entry.date = data.get('date', nutrition_entry.date)
        nutrition_entry.meal_type = data.get('meal_type', nutrition_entry.meal_type)
        db.session.commit()
        return nutrition_entry.to_dict()

    # Delete a specific nutrition entry
    elif request.method == 'DELETE':
        db.session.delete(nutrition_entry)
        db.session.commit()
        return ('Nutrition entry deleted', 204)
