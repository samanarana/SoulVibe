from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import Nutrition, NutritionDetails, db
from flask_login import current_user, login_required

nutrition_routes = Blueprint('nutrition', __name__)


# Fetch all nutrition entries from all users
@nutrition_routes.route('/all', methods=['GET'])
def get_all_nutrition_entries():
    all_nutrition = Nutrition.query.all()
    return {'nutrition': [entry.to_dict() for entry in all_nutrition]}


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
    date_str = data['date']
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

    new_nutrition = Nutrition(
        userId=current_user.id,
        date=date_obj,
        meal_type=data['meal_type']
    )

    # Extracting nutrition details from the request
    nutrition_details_data = data.get('nutrition_details', [])
    for detail_data in nutrition_details_data:
        new_detail = NutritionDetails(
            nutrition_id=new_nutrition.id,
            category_id=detail_data['category_id'],
            description=detail_data['description'],
            amount=detail_data['amount']
        )
        new_nutrition.nutrition_details.append(new_detail)

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

        if 'date' in data:
            data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date()

        nutrition_entry.date = data.get('date', nutrition_entry.date)
        nutrition_entry.meal_type = data.get('meal_type', nutrition_entry.meal_type)

        # Updating NutritionDetails
        if 'nutrition_details' in data:
            # Remove existing nutrition details
            NutritionDetails.query.filter_by(nutrition_id=id).delete()

            # Add updated nutrition details
            for detail_data in data['nutrition_details']:
                new_detail = NutritionDetails(
                    nutrition_id=nutrition_entry.id,
                    category_id=detail_data['category_id'],
                    description=detail_data['description'],
                    amount=detail_data['amount']
                )
                db.session.add(new_detail)

        db.session.commit()
        return nutrition_entry.to_dict()

    # Delete a specific nutrition entry
    elif request.method == 'DELETE':
        db.session.delete(nutrition_entry)
        db.session.commit()
        return jsonify(message='Nutrition entry deleted'), 200
