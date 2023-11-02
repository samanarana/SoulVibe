from .db import db, environment, SCHEMA, add_prefix_for_prod

class FoodCategory(db.Model):
    __tablename__ = 'food_categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String, nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category_name': self.category_name
        }
