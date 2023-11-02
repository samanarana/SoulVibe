from .db import db, environment, SCHEMA, add_prefix_for_prod

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date)
    content = db.Column(db.Text)
    mood_emoji = db.Column(db.String)

    # Relationships
    user = db.relationship("User", back_populates="journals")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.date,
            'content': self.content,
            'mood_emoji': self.mood_emoji,
        }
