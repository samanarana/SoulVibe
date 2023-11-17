from .db import db, environment, SCHEMA, add_prefix_for_prod

class Stress(db.Model):
    __tablename__ = 'stresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date, nullable=False)
    stress_level = db.Column(db.Integer, nullable=False)
    personal_relationships = db.Column(db.String, nullable=False)
    physical_symptoms = db.Column(db.String, nullable=False)
    exercise_frequency = db.Column(db.String, nullable=False)
    nutrition_habits = db.Column(db.String, nullable=False)
    relaxation_activities = db.Column(db.String, nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="stresses")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'stress_level': self.stress_level,
            'personal_relationships': self.personal_relationships,
            'physical_symptoms': self.physical_symptoms,
            'exercise_frequency': self.exercise_frequency,
            'nutrition_habits': self.nutrition_habits,
            ' relaxation_activities': self.relaxation_activities,

        }
