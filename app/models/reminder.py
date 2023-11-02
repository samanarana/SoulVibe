from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reminder(db.Model):
    __tablename__ = 'reminder'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    scheduled_at = db.Column(db.Date, nullable=False, unique=True)

    # Relationships
    user = db.relationship("User", back_populates="reminder")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'type': self.type,
            'content': self.content,
            'scheduled_at': self.scheduled_at,
        }
