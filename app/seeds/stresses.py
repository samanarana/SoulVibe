from app.models import db, Stress, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, timedelta
import random

def seed_stresses():
    stresses = []
    start_date = date.today() - timedelta(days=28)  # Starting from 28 days ago

    stress_levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    stress_weights = [0.5, 0.5, 1, 1, 2, 2, 2, 1, 1, 0.5]
    relationships = ["Amazing", "Supportive", "Stable", "Improving", "Strained", "Stressful", "Conflictual", "Distant", "Nonexistent"]
    physical_symptoms = ["None", "Headaches", "Fatigue", "Muscle Tension", "Digestive Issues", "Sleep Disturbances", "Other"]
    exercise_frequency = ["Daily", "2-3 times a week", "Once a week", "2-3 times a month", "Rarely", "Never"]
    nutrition_habits = ["Balanced Diet", "Home Cooked Meals", "Fast Food Oriented", "Irregular Meals", "Vegetarian", "Vegan", "Low Carb", "High Protein"]
    relaxation_activities = ["Reading", "Meditation", "Yoga", "Listening to Music", "Walking", "Gardening", "Painting", "Baking"]

    for day in range(28):
        current_date = start_date + timedelta(days=day)

        for user_id in range(1, 7):
            stress = Stress(
                userId=user_id,
                date=current_date,
                stress_level=random.choices(stress_levels, weights=stress_weights, k=1)[0],
                personal_relationships=random.choice(relationships),
                physical_symptoms=random.choice(physical_symptoms),
                exercise_frequency=random.choice(exercise_frequency),
                nutrition_habits=random.choice(nutrition_habits),
                relaxation_activities=random.choice(relaxation_activities)
            )
            stresses.append(stress)

    db.session.add_all(stresses)
    db.session.commit()

def undo_stresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stresses"))

    db.session.commit()
