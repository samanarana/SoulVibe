"""empty message

Revision ID: eaa416867b9d
Revises:
Create Date: 2023-11-17 11:06:44.066831

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'eaa416867b9d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('food_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category_name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('category_name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE food_categories SET SCHEMA {SCHEMA};")

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('exercise_type', sa.String(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('intensity', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE exercises SET SCHEMA {SCHEMA};")

    op.create_table('journals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('mood_emoji', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('userId', 'date', name='uq_userId_date')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE journals SET SCHEMA {SCHEMA};")

    op.create_table('meditations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('meditation_type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE meditations SET SCHEMA {SCHEMA};")

    op.create_table('nutritions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('meal_type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE nutritions SET SCHEMA {SCHEMA};")

    op.create_table('reminders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('scheduled_at', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('scheduled_at')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE reminders SET SCHEMA {SCHEMA};")

    op.create_table('sleeps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('sleep_duration', sa.Integer(), nullable=False),
    sa.Column('quality_of_sleep', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE sleeps SET SCHEMA {SCHEMA};")

    op.create_table('stresses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('stress_level', sa.Integer(), nullable=False),
    sa.Column('personal_relationships', sa.String(), nullable=False),
    sa.Column('physical_symptoms', sa.String(), nullable=False),
    sa.Column('exercise_frequency', sa.String(), nullable=False),
    sa.Column('nutrition_habits', sa.String(), nullable=False),
    sa.Column('relaxation_activities', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE stresses SET SCHEMA {SCHEMA};")

    op.create_table('nutrition_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nutrition_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('amount', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['food_categories.id'], ),
    sa.ForeignKeyConstraint(['nutrition_id'], ['nutritions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE nutrition_details SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nutrition_details')
    op.drop_table('stresses')
    op.drop_table('sleeps')
    op.drop_table('reminders')
    op.drop_table('nutritions')
    op.drop_table('meditations')
    op.drop_table('journals')
    op.drop_table('exercises')
    op.drop_table('users')
    op.drop_table('food_categories')
    # ### end Alembic commands ###
