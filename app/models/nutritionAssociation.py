from .db import db, environment, SCHEMA, add_prefix_for_prod

class NutritionDetails(db.Model):
    __tablename__ = 'nutrition_details'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    nutrition_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('nutrition.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('food_categories.id')), nullable=False)
    description = db.Column(db.Text, nullable=False)
    amount = db.Column(db.String, nullable=False)

    # Relationships
    nutrition = db.relationship('Nutrition', back_populates='nutrition_details')
    category = db.relationship('FoodCategory')

    def to_dict(self):
        return {
            'id': self.id,
            'nutrition_id': self.nutrition_id,
            'category_id': self.category_id,
            'description': self.description,
            'amount': self.amount
        }
