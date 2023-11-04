from app.models import db, FoodCategory

def seed_food_categories():
    fruits = FoodCategory(category_name="Fruits")
    vegetables = FoodCategory(category_name="Vegetables")
    proteins = FoodCategory(category_name="Proteins")
    grains = FoodCategory(category_name="Grains")
    dairy = FoodCategory(category_name="Dairy")
    dessert = FoodCategory(category_name="Dessert")
    drinks = FoodCategory(category_name="Drinks")

    db.session.add_all([fruits, vegetables, proteins, grains, dairy, dessert, drinks])
    db.session.commit()

def undo_food_categories():
    db.session.execute('TRUNCATE food_categories;')
    db.session.commit()
