from .db import db, environment, SCHEMA, add_prefix_for_prod

class Meditation(db.Model):
    __tablename__ = 'meditations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date)
    duration = db.Column(db.Integer)
    meditation_type = db.Column(db.String)

    # Relationships
    user = db.relationship("User", back_populates="meditations")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'duration': self.duration,
            'meditation_type': self.meditation_type,
        }
