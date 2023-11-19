from app.models import db, Nutrition, NutritionDetails
from datetime import date, timedelta
import random

def seed_nutritions():
    meal_types = ["breakfast", "lunch", "snack", "dinner", "dessert"]
    sample_nutrition_details = [
        {"category_id": 3, "description": "Beef Steak", "amount": "200g"},
        {"category_id": 1, "description": "Strawberries", "amount": "1 cup"},
        {"category_id": 5, "description": "Cheese", "amount": "50g"},
        {"category_id": 2, "description": "Honey", "amount": "1 tbsp"},
        {"category_id": 6, "description": "Chocolate Cake", "amount": "1 slice"},
        {"category_id": 3, "description": "Bison Burger", "amount": "150g"},
        {"category_id": 1, "description": "Blueberries", "amount": "1 cup"},
        {"category_id": 5, "description": "Eggs", "amount": "2 pieces"},
        {"category_id": 2, "description": "Maple Syrup", "amount": "2 tbsp"},
        {"category_id": 6, "description": "Vanilla Ice Cream", "amount": "1 scoop"},
        {"category_id": 3, "description": "Grilled Salmon", "amount": "150g"},
        {"category_id": 1, "description": "Mixed Berries", "amount": "1/2 cup"},
        {"category_id": 5, "description": "Greek Yogurt", "amount": "100g"},
        {"category_id": 2, "description": "Almond Butter", "amount": "1 tbsp"},
        {"category_id": 6, "description": "Lemon Tart", "amount": "1 piece"},
        {"category_id": 3, "description": "Turkey Sandwich", "amount": "1 sandwich"},
        {"category_id": 1, "description": "Green Salad", "amount": "1 bowl"},
        {"category_id": 5, "description": "Feta Cheese", "amount": "30g"},
        {"category_id": 2, "description": "Agave Syrup", "amount": "1 tsp"},
        {"category_id": 6, "description": "Fruit Sorbet", "amount": "1 scoop"},
        {"category_id": 3, "description": "Veggie Burger", "amount": "1 burger"},
        {"category_id": 1, "description": "Carrot Sticks", "amount": "100g"},
        {"category_id": 5, "description": "Scrambled Eggs", "amount": "2 eggs"},
        {"category_id": 2, "description": "Peanut Butter", "amount": "2 tbsp"},
        {"category_id": 6, "description": "Oatmeal Cookie", "amount": "2 cookies"},
        {"category_id": 3, "description": "Roast Beef", "amount": "200g"},
        {"category_id": 1, "description": "Cucumber Salad", "amount": "1 bowl"},
        {"category_id": 5, "description": "Cottage Cheese", "amount": "100g"},
    ]

    user_dates = {
        1: date(2023, 11, 10),
        2: date(2023, 11, 18),
        3: date(2023, 11, 24),
        4: date(2023, 11, 30),
        5: date(2023, 12, 4),
        6: date(2023, 12, 10),
    }

    for user_id in user_dates:
        for day in range(8):
            nutrition_date = user_dates[user_id] + timedelta(days=day)
            selected_meal_types = random.sample(meal_types, 4)

            for meal in selected_meal_types:
                nutrition = Nutrition(userId=user_id, date=nutrition_date, meal_type=meal)
                db.session.add(nutrition)
                db.session.flush()

                # Randomly select 3-6 unique nutrition details for each meal
                nutrition_details_count = random.randint(3, 6)
                selected_nutrition_details = random.sample(sample_nutrition_details, nutrition_details_count)

                for detail in selected_nutrition_details:
                    nutrition_detail = NutritionDetails(
                        nutrition_id=nutrition.id,
                        category_id=detail["category_id"],
                        description=detail["description"],
                        amount=detail["amount"]
                    )
                    db.session.add(nutrition_detail)

    db.session.commit()

def undo_nutritions():
    db.session.execute('TRUNCATE nutritions;')
    db.session.commit()
