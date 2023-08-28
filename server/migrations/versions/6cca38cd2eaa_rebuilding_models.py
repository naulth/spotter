"""rebuilding models

Revision ID: 6cca38cd2eaa
Revises: 
Create Date: 2023-07-18 02:06:58.967875

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cca38cd2eaa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('muscle', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('birth_date', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('confirm_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('splits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('days', sa.Integer(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_splits_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_workouts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('split_workout_association',
    sa.Column('split_id', sa.Integer(), nullable=True),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['split_id'], ['splits.id'], name=op.f('fk_split_workout_association_split_id_splits')),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_split_workout_association_workout_id_workouts'))
    )
    op.create_table('workout_exercise_association',
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], name=op.f('fk_workout_exercise_association_exercise_id_exercises')),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_workout_exercise_association_workout_id_workouts'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workout_exercise_association')
    op.drop_table('split_workout_association')
    op.drop_table('workouts')
    op.drop_table('splits')
    op.drop_table('users')
    op.drop_table('exercises')
    # ### end Alembic commands ###