from .db import db, environment, SCHEMA, add_prefix_for_prod

class Sleep(db.Model):
    __tablename__ = 'sleeps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date, nullable=False)
    sleep_duration = db.Column(db.Integer, nullable=False)
    quality_of_sleep = db.Column(db.String, nullable=False)
    morning_mood = db.Column(db.String, nullable=False)
    dreams = db.Column(db.String, nullable=False)
    alcohol = db.Column(db.String, nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="sleeps")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'sleep_duration': self.sleep_duration,
            'quality_of_sleep': self.quality_of_sleep,
            'morning_mood': self.morning_mood,
            'dreams': self.dreams,
            'alcohol': self.alcohol
        }
