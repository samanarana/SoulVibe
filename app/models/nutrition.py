from .db import db, environment, SCHEMA, add_prefix_for_prod

class Nutrition(db.Model):
    __tablename__ = 'nutritions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date)
    meal_type = db.Column(db.String)

    # Relationships
    user = db.relationship('User', back_populates='nutritions')
    nutrition_details = db.relationship('NutritionDetails', back_populates='nutritions', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'meal_type': self.meal_type,
            'nutrition_details': [detail.to_dict() for detail in self.nutrition_details]
        }
