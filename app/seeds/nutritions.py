from app.models import db, Nutrition
from datetime import date

def seed_nutritions():
    # List of meal types
    meal_types = ["Breakfast", "Brunch", "Lunch", "Snack", "Dinner", "Dessert"]

    nutrition_data = []
    for user_id in range(1, 7):
        for meal in meal_types:
            nutrition_data.append(Nutrition(userId=user_id, date=date.today(), meal_type=meal))

    db.session.add_all(nutrition_data)
    db.session.commit()

def undo_nutritions():
    db.session.execute('TRUNCATE nutritions;')
    db.session.commit()
