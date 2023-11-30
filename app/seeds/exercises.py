from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_exercises():
    exercise_info = [
        ('Running', 30, 'Moderate'),
        ('Cycling', 45, 'High'),
        ('Hiking', 120, 'Low'),
        ('Yoga', 60, 'Low'),
        ('Swimming', 40, 'Moderate'),
        ('Skateboarding', 30, 'High'),
        ('Basketball', 60, 'High'),
        ('Soccer', 90, 'High'),
        ('Tennis', 50, 'Moderate'),
        ('Frisbee', 30, 'Low'),
        ('Rock Climbing', 120, 'High'),
        ('Canoeing', 180, 'Moderate'),
        ('Surfing', 90, 'High'),
        ('Rollerblading', 45, 'Moderate'),
        ('Dancing', 60, 'Moderate'),
        ('Gardening', 180, 'Low'),
        ('Walking', 30, 'Low'),
        ('Weight Lifting', 120, 'High'),
        ('Pilates', 60, 'Moderate'),
        ('Kickboxing', 60, 'High')
    ]

    exercises = []
    number_of_users = 6

    for user_id in range(1, number_of_users + 1):
        # Assign each user 6 exercises on consecutive days
        for i in range(6):
            exercise_index = (user_id + i) % len(exercise_info)
            exercise_type, duration, intensity = exercise_info[exercise_index]
            exercise_date = datetime.now() - timedelta(days=i)
            exercises.append(Exercise(userId=user_id, date=exercise_date, exercise_type=exercise_type, duration=duration, intensity=intensity))

    db.session.add_all(exercises)
    db.session.commit()


def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
