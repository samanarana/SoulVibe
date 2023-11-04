from app.models import db, NutritionDetails

def seed_nutrition_details():
    details_data = [
        (1, 3, "Beef Steak", "200g"),
        (1, 1, "Strawberries", "1 cup"),
        (1, 5, "Cheese", "50g"),
        (1, 2, "Honey", "1 tbsp"),
        (1, 6, "Chocolate Cake", "1 slice"),

        (2, 3, "Bison Burger", "150g"),
        (2, 1, "Blueberries", "1 cup"),
        (2, 5, "Eggs", "2 pieces"),
        (2, 2, "Maple Syrup", "2 tbsp"),
        (2, 6, "Vanilla Ice Cream", "1 scoop"),

        (3, 3, "Venison Stew", "250g"),
        (3, 1, "Raspberries", "1 cup"),
        (3, 5, "Cheese", "50g"),
        (3, 4, "Dates", "5 pieces"),
        (3, 6, "Apple Pie", "1 slice"),

        (4, 3, "Grilled Chicken", "200g"),
        (4, 1, "Apple", "1 piece"),
        (4, 5, "Eggs", "2 pieces"),
        (4, 2, "Honey", "1 tbsp"),
        (4, 6, "Cheesecake", "1 slice"),

        (5, 3, "Salmon", "150g"),
        (5, 1, "Blackberries", "1 cup"),
        (5, 5, "Cheese", "50g"),
        (5, 2, "Maple Syrup", "2 tbsp"),
        (5, 6, "Brownie", "1 piece"),

        (6, 3, "Bison Steak", "200g"),
        (6, 1, "Banana", "1 piece"),
        (6, 5, "Eggs", "2 pieces"),
        (6, 4, "Dates", "5 pieces"),
        (6, 6, "Banana Split", "1 serving"),

        (7, 3, "Beef Burger", "150g"),
        (7, 1, "Grapes", "1 bunch"),
        (7, 5, "Cheese", "50g"),
        (7, 2, "Honey", "1 tbsp"),
        (7, 6, "Pecan Pie", "1 slice"),

        (8, 3, "Venison Roast", "250g"),
        (8, 1, "Peach", "1 piece"),
        (8, 5, "Eggs", "2 pieces"),
        (8, 2, "Maple Syrup", "2 tbsp"),
        (8, 6, "Tiramisu", "1 serving"),

        (9, 3, "Chicken Wings", "200g"),
        (9, 1, "Cherries", "1 cup"),
        (9, 5, "Cheese", "50g"),
        (9, 4, "Dates", "5 pieces"),
        (9, 6, "Chocolate Chip Cookies", "2 pieces"),

        (10, 3, "Salmon Steak", "150g"),
        (10, 1, "Pineapple", "1 slice"),
        (10, 5, "Eggs", "2 pieces"),
        (10, 2, "Honey", "1 tbsp"),
        (10, 6, "Pavlova", "1 slice"),

        (11, 3, "Beef Ribs", "250g"),
        (11, 1, "Watermelon", "1 slice"),
        (11, 5, "Cheese", "50g"),
        (11, 2, "Maple Syrup", "2 tbsp"),
        (11, 6, "Gelato", "1 scoop"),

        (12, 3, "Bison Roast", "200g"),
        (12, 1, "Kiwi", "1 piece"),
        (12, 5, "Eggs", "2 pieces"),
        (12, 4, "Dates", "5 pieces"),
        (12, 6, "Berry Crumble", "1 serving"),
    ]

    nutrition_details_data = [NutritionDetails(nutrition_id=n_id, category_id=c_id, description=desc, amount=amt) for n_id, c_id, desc, amt in details_data]

    db.session.add_all(nutrition_details_data)
    db.session.commit()

def undo_nutrition_details():
    db.session.execute('TRUNCATE nutrition_details;')
    db.session.commit()
