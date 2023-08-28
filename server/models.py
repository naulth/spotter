from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Table, Column, Integer, ForeignKey
from config import db, bcrypt
from datetime import datetime, timedelta
from sqlalchemy.orm import validates


class User (db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-workouts', '-splits',)

    id = db.Column( db.Integer, primary_key = True )

    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_date = db.Column(db.String, nullable=False)
    username = db.Column( db.String, unique = True, nullable = False)
    _password_hash = db.Column( db.String, nullable = False )
    confirm_password = db.Column(db.String, nullable = False)

    workouts = db.relationship('Workout', backref='user', cascade='all, delete')
    splits = db.relationship('Split', backref='user', cascade='all, delete')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 5:
            raise ValueError("Username must be at least 5 characters.")
        return username
    
    @validates('first_name', 'last_name')
    def validate_names(self, key, value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        elif isinstance(value, int):
            raise ValueError('Integer values are not allowed.')
        return value
    
    # @validates('birth_date')
    # def validate_birth_date(self, key, value):
    #     birth_date = datetime.strptime(value, '%Y-%m-%d')
    #     age = datetime.now() - birth_date
    #     if age < timedelta(days=365*18):
    #         raise ValueError('User must be over 18 years old.')
    #     return value
        
    @validates('_password_hash', 'confirm_password' )
    def validate_password(self, key, value):
        if len(value) < 8:
            raise ValueError('Password must be at least 8 characters long.')
        return value
    
    @hybrid_property
    def password_hash( self ):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode( 'utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))
    
    def user_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "workouts": [w.to_dict() for w in self.workouts],
            "splits": [s.to_dict() for s in self.splits]
        }

workout_exercise_association = Table('workout_exercise_association', db.Model.metadata,
    Column('workout_id', Integer, ForeignKey('workouts.id')),
    Column('exercise_id', Integer, ForeignKey('exercises.id'))    
)

split_workout_association = Table('split_workout_association', db.Model.metadata,
    Column('split_id', Integer, ForeignKey('splits.id')),
    Column('workout_id', Integer, ForeignKey('workouts.id'))

)

class Exercise (db.Model, SerializerMixin):
    __tablename__ = 'exercises'

    serialize_rules = ('-workouts',)

    id = db.Column( db.Integer, primary_key = True )
    name = db.Column( db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    muscle = db.Column(db.String, nullable = False)

    workouts = db.relationship(
        'Workout', 
        secondary=workout_exercise_association, 
        back_populates='exercises')

class Split (db.Model, SerializerMixin):
    __tablename__ = 'splits'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    name = db.Column(db.String, nullable = False)
    days = db.Column(db.Integer, nullable = False)
    duration = db.Column(db.Integer, nullable = False)

    workouts = db.relationship('Workout', secondary='split_workout_association', back_populates='splits')

class Workout (db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    serialize_rules = ('-user', '-splits',)

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    name = db.Column(db.String, nullable = False)

    splits = db.relationship('Split', secondary='split_workout_association', back_populates='workouts')

    exercises = db.relationship(
        'Exercise', 
        secondary='workout_exercise_association', 
        back_populates='workouts')


