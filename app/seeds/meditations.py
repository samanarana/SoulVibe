from app.models import db, Meditation, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_meditations():
    meditation1 = Meditation(
        userId=1,
        date=date.today(),
        duration=10,
        meditation_type="Mindfulness"
    )
    meditation2 = Meditation(
        userId=2,
        date=date.today(),
        duration=15,
        meditation_type="Guided Visualization"
    )
    meditation3 = Meditation(
        userId=3,
        date=date.today(),
        duration=20,
        meditation_type="Kundalini Yoga"
    )
    meditation4 = Meditation(
        userId=4,
        date=date.today(),
        duration=5,
        meditation_type="Tai Chi"
    )
    meditation5 = Meditation(
        userId=5,
        date=date.today(),
        duration=25,
        meditation_type="Walking in Nature"
    )
    meditation6 = Meditation(
        userId=6,
        date=date.today(),
        duration=10,
        meditation_type="Mantra"
    )
    meditation7 = Meditation(
        userId=1,
        date=date.today(),
        duration=15,
        meditation_type="Chakra Meditation"
    )
    meditation8 = Meditation(
        userId=2,
        date=date.today(),
        duration=12,
        meditation_type="Writing"
    )
    meditation9 = Meditation(
        userId=3,
        date=date.today(),
        duration=30,
        meditation_type="Psychedelics"
    )
    meditation10 = Meditation(
        userId=4,
        date=date.today(),
        duration=7,
        meditation_type="Reflective Meditation"
    )

    db.session.add_all([meditation1, meditation2, meditation3, meditation4, meditation5,
                        meditation6, meditation7, meditation8, meditation9, meditation10])
    db.session.commit()

def undo_meditations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meditations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meditations"))

    db.session.commit()
