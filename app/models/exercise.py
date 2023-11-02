from .db import db, environment, SCHEMA, add_prefix_for_prod

class Exercise(db.Model):
    __tablename__ = 'exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date)
    exercise_type = db.Column(db.String)
    duration = db.Column(db.Integer)
    intensity = db.Column(db.String)

    # Relationships
    user =db.relationship("User", back_populates="exercises")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'exercise_type': self.exercise_type,
            'duration': self.duration,
            'intensity': self.intensity,
        }
