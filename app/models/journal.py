from .db import db, environment, SCHEMA, add_prefix_for_prod

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date, nullable=False)
    content = db.Column(db.Text, nullable=False)
    mood_emoji = db.Column(db.String, nullable=False)

    # Unique constraint on userId and date so each user can have only one
    # journal entry per day, but multiple users can have entries on the same day
    __table_args__ = (db.UniqueConstraint('userId', 'date', name='uq_userId_date'),)

    # Relationships
    user = db.relationship("User", back_populates="journals")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            "date": self.date.strftime('%Y-%m-%d'),
            'content': self.content,
            'mood_emoji': self.mood_emoji,
        }
