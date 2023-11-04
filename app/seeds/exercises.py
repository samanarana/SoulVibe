from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_exercises():
    exercises = [
        Exercise(userId=1, date=datetime.now() - timedelta(days=1), exercise_type='Running', duration=30, intensity='Moderate'),
        Exercise(userId=2, date=datetime.now() - timedelta(days=2), exercise_type='Cycling', duration=45, intensity='High'),
        Exercise(userId=3, date=datetime.now() - timedelta(days=3), exercise_type='Hiking', duration=120, intensity='Low'),
        Exercise(userId=4, date=datetime.now() - timedelta(days=4), exercise_type='Yoga', duration=60, intensity='Low'),
        Exercise(userId=5, date=datetime.now() - timedelta(days=5), exercise_type='Swimming', duration=40, intensity='Moderate'),
        Exercise(userId=6, date=datetime.now() - timedelta(days=6), exercise_type='Skateboarding', duration=30, intensity='High'),
        #Exercise(userId=1, date=datetime.now() - timedelta(days=7), exercise_type='Basketball', duration=60, intensity='High'),
        #Exercise(userId=2, date=datetime.now() - timedelta(days=8), exercise_type='Soccer', duration=90, intensity='High'),
        #Exercise(userId=3, date=datetime.now() - timedelta(days=9), exercise_type='Tennis', duration=50, intensity='Moderate'),
        #Exercise(userId=4, date=datetime.now() - timedelta(days=10), exercise_type='Frisbee', duration=30, intensity='Low'),
        #Exercise(userId=5, date=datetime.now() - timedelta(days=11), exercise_type='Rock Climbing', duration=120, intensity='High'),
        #Exercise(userId=6, date=datetime.now() - timedelta(days=12), exercise_type='Canoeing', duration=180, intensity='Moderate'),
        #Exercise(userId=1, date=datetime.now() - timedelta(days=13), exercise_type='Surfing', duration=90, intensity='High'),
        #Exercise(userId=2, date=datetime.now() - timedelta(days=14), exercise_type='Rollerblading', duration=45, intensity='Moderate'),
        #Exercise(userId=3, date=datetime.now() - timedelta(days=15), exercise_type='Dancing', duration=60, intensity='Moderate'),
        #Exercise(userId=4, date=datetime.now() - timedelta(days=16), exercise_type='Gardening', duration=180, intensity='Low'),
        #Exercise(userId=5, date=datetime.now() - timedelta(days=17), exercise_type='Walking', duration=30, intensity='Low'),
        #Exercise(userId=6, date=datetime.now() - timedelta(days=18), exercise_type='Weight Lifting', duration=120, intensity='High'),
    ]

    db.session.add_all(exercises)
    db.session.commit()

def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
