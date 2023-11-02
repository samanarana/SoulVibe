from .db import db, environment, SCHEMA, add_prefix_for_prod

class Meditation(db.Model):
    __tablename__ = 'meditation'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date, nullable=False, unique=True)
    duration = db.Column(db.Integer, nullable=False)
    meditation_type = db.Column(db.String, nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="meditation")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'duration': self.duration,
            'meditation_type': self.meditation_type,
        }
