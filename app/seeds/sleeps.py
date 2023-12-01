from app.models import db, Sleep, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, timedelta
import random

def seed_sleeps():
    sleeps = []
    start_date = date.today() - timedelta(days=14)  # Starting from 14 days ago to get 2 weeks of data

    sleep_durations = list(range(1, 12))
    quality_of_sleep_options = ['Excellent', 'Great', 'Good', 'Fair', 'Poor', 'No Sleep']
    morning_moods = ['Energetic', 'Stressed', 'Relaxed', 'Anxious', 'Joyful', 'Irritable', 'Groggy', 'Restless', 'Refreshed']
    dreams_options = ['Yes', 'No']
    alcohol_options = ['Yes', 'No']

    for day in range(14):
        current_date = start_date + timedelta(days=day)

        for user_id in range(1, 7):
            sleep = Sleep(
                userId=user_id,
                date=current_date,
                sleep_duration=random.choice(sleep_durations),
                quality_of_sleep=random.choice(quality_of_sleep_options),
                morning_mood=random.choice(morning_moods),
                dreams=random.choice(dreams_options),
                alcohol=random.choice(alcohol_options)
            )
            sleeps.append(sleep)

    db.session.add_all(sleeps)
    db.session.commit()

def undo_sleeps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sleeps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sleeps"))

    db.session.commit()
