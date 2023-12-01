from app.models import db, Nutrition, NutritionDetails
from datetime import date, timedelta
import random

def seed_nutritions():
    meal_types = ["breakfast", "lunch", "snack", "dinner", "dessert"]

    # Categorized nutrition details
    breakfast_items = [
        {"category_id": 1, "description": "Oatmeal", "amount": "1 bowl"},
        {"category_id": 5, "description": "Scrambled Eggs", "amount": "2 eggs"},
        {"category_id": 2, "description": "Toast with Jam", "amount": "2 slices"},
        {"category_id": 5, "description": "Greek Yogurt", "amount": "100g"},
        {"category_id": 1, "description": "Fruit Salad", "amount": "1 cup"},
        {"category_id": 1, "description": "Pancakes", "amount": "3 pieces"},
        {"category_id": 2, "description": "Honey", "amount": "1 tbsp"},
        {"category_id": 5, "description": "Cottage Cheese", "amount": "100g"},
        {"category_id": 1, "description": "Granola", "amount": "1/2 cup"},
        {"category_id": 5, "description": "Cheese Omelette", "amount": "1 piece"},
    ]
    lunch_items = [
        {"category_id": 3, "description": "Turkey Sandwich", "amount": "1 sandwich"},
        {"category_id": 1, "description": "Caesar Salad", "amount": "1 bowl"},
        {"category_id": 3, "description": "Veggie Burger", "amount": "1 burger"},
        {"category_id": 3, "description": "Chicken Salad", "amount": "1 bowl"},
        {"category_id": 3, "description": "Tuna Wrap", "amount": "1 wrap"},
        {"category_id": 1, "description": "Quinoa Salad", "amount": "1 bowl"},
        {"category_id": 3, "description": "BLT Sandwich", "amount": "1 sandwich"},
        {"category_id": 3, "description": "Grilled Cheese", "amount": "1 sandwich"},
        {"category_id": 1, "description": "Tomato Soup", "amount": "1 bowl"},
        {"category_id": 3, "description": "Sushi Rolls", "amount": "6 pieces"},
    ]
    snack_items = [
        {"category_id": 1, "description": "Mixed Nuts", "amount": "50g"},
        {"category_id": 6, "description": "Granola Bar", "amount": "1 bar"},
        {"category_id": 1, "description": "Apple Slices", "amount": "1 cup"},
        {"category_id": 1, "description": "Carrot Sticks", "amount": "100g"},
        {"category_id": 5, "description": "String Cheese", "amount": "1 piece"},
        {"category_id": 1, "description": "Yogurt Parfait", "amount": "1 cup"},
        {"category_id": 2, "description": "Dark Chocolate", "amount": "30g"},
        {"category_id": 1, "description": "Hummus with Veggies", "amount": "1 serving"},
        {"category_id": 1, "description": "Fruit Smoothie", "amount": "1 glass"},
        {"category_id": 1, "description": "Trail Mix", "amount": "1/2 cup"},
    ]
    dinner_items = [
        {"category_id": 3, "description": "Grilled Chicken Breast", "amount": "200g"},
        {"category_id": 1, "description": "Steamed Vegetables", "amount": "1 cup"},
        {"category_id": 3, "description": "Spaghetti Bolognese", "amount": "1 serving"},
        {"category_id": 3, "description": "Beef Stir Fry", "amount": "1 serving"},
        {"category_id": 1, "description": "Grilled Salmon", "amount": "150g"},
        {"category_id": 3, "description": "Roast Beef", "amount": "200g"},
        {"category_id": 1, "description": "Vegetable Curry", "amount": "1 serving"},
        {"category_id": 1, "description": "Baked Potato", "amount": "1 large"},
        {"category_id": 1, "description": "Rice and Beans", "amount": "1 bowl"},
        {"category_id": 3, "description": "Lamb Chops", "amount": "2 pieces"},
    ]
    dessert_items = [
        {"category_id": 6, "description": "Chocolate Cake", "amount": "1 slice"},
        {"category_id": 6, "description": "Apple Pie", "amount": "1 slice"},
        {"category_id": 6, "description": "Cheesecake", "amount": "1 slice"},
        {"category_id": 6, "description": "Ice Cream", "amount": "1 scoop"},
        {"category_id": 6, "description": "Fruit Sorbet", "amount": "1 scoop"},
        {"category_id": 6, "description": "Brownie", "amount": "1 piece"},
        {"category_id": 6, "description": "Cupcake", "amount": "1 piece"},
        {"category_id": 6, "description": "Chocolate Truffles", "amount": "3 pieces"},
        {"category_id": 6, "description": "Lemon Tart", "amount": "1 piece"},
        {"category_id": 6, "description": "Panna Cotta", "amount": "1 serving"},
    ]

    meal_items = {
        "breakfast": breakfast_items,
        "lunch": lunch_items,
        "snack": snack_items,
        "dinner": dinner_items,
        "dessert": dessert_items
    }

    start_date = date.today() - timedelta(weeks=2)
    end_date = date.today() + timedelta(weeks=2)
    user_ids = range(1, 7)

    for user_id in user_ids:
        current_date = start_date
        while current_date <= end_date:
            selected_meal_types = random.sample(meal_types, 4)

            for meal in selected_meal_types:
                nutrition = Nutrition(userId=user_id, date=current_date, meal_type=meal)
                db.session.add(nutrition)
                db.session.flush()

                # Randomly select 3-6 unique nutrition details for each meal
                nutrition_details_count = random.randint(2, 6)
                selected_nutrition_details = random.sample(meal_items[meal], nutrition_details_count)

                for detail in selected_nutrition_details:
                    nutrition_detail = NutritionDetails(
                        nutrition_id=nutrition.id,
                        category_id=detail["category_id"],
                        description=detail["description"],
                        amount=detail["amount"]
                    )
                    db.session.add(nutrition_detail)

            current_date += timedelta(days=1)

    db.session.commit()

def undo_nutritions():
    db.session.execute('TRUNCATE nutritions;')
    db.session.commit()
