from app.models import db, Meditation, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, timedelta
import random

# List of meditation types
meditation_types = [
    "Mindfulness", "Guided Visualization", "Kundalini Yoga", "Tai Chi",
    "Nature Walk", "Mantra", "Chakra Meditation", "Writing",
    "Psychedelics", "Reflective Meditation"
]

def seed_meditations():
    meditations = []
    start_date = date.today() - timedelta(days=14)  # Starting from 14 days ago to get 2 weeks of data

    for day in range(14):
        current_date = start_date + timedelta(days=day)

        for user_id in range(1, 7): # There are 6 users
            meditation_type = random.choice(meditation_types)
            duration = random.randint(5, 60)  # Random duration between 5 and 60 minutes
            meditation = Meditation(
                userId=user_id,
                date=current_date,
                duration=duration,
                meditation_type=meditation_type
            )
            meditations.append(meditation)

    db.session.add_all(meditations)
    db.session.commit()


def undo_meditations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meditations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meditations"))

    db.session.commit()
