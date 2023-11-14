from app.models import db, Nutrition
from datetime import date, timedelta
import random

def seed_nutritions():
    meal_types = ["breakfast", "lunch", "snack", "dinner", "dessert"]
    nutrition_data = []

    # Example specific dates for each user
    user_dates = {
        1: date(2023, 11, 10),
        2: date(2023, 11, 18),
        3: date(2023, 11, 24),
        4: date(2023, 11, 30),
        5: date(2023, 12, 4),
        6: date(2023, 12, 10)
    }

    # Seed data for a 7-day range for each user
    for user_id in user_dates:
        for day in range(8):
            nutrition_date = user_dates[user_id] + timedelta(days=day)
            selected_meal_types = random.sample(meal_types, 3)

            for meal in selected_meal_types:
                nutrition_data.append(Nutrition(userId=user_id, date=nutrition_date, meal_type=meal))

    db.session.add_all(nutrition_data)
    db.session.commit()

def undo_nutritions():
    db.session.execute('TRUNCATE nutritions;')
    db.session.commit()
