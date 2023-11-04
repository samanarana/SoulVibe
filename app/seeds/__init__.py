from flask.cli import AppGroup
from .users import seed_users, undo_users
from .nutritions import seed_nutritions, undo_nutritions
from .nutritionDetails import seed_nutrition_details, undo_nutrition_details
from .foodCategories import seed_food_categories, undo_food_categories
from .exercises import seed_exercises, undo_exercises
from .journals import seed_journals, undo_journals
from .meditations import seed_meditations, undo_meditations

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_nutritions()
        undo_nutrition_details()
        undo_food_categories()
        undo_exercises()
        undo_journals()
        undo_meditations()
    seed_users()
    seed_nutritions()
    seed_nutrition_details()
    seed_food_categories()
    seed_exercises()
    seed_journals()
    seed_meditations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_nutrition_details()
    undo_nutritions()
    undo_food_categories()
    undo_users()
    # Add other undo functions here
