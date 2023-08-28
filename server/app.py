from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User, Exercise, Workout, Split


class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200
    
    
@app.before_request
def check_if_logged_in():
    logged_in = session.get('user_id')
    signing_up = 'signup' in request.path and 'POST' in request.method
    logging_in = 'login' in request.path and 'POST' in request.method
    
    if not logged_in and not signing_up and not logging_in:
        return make_response ( {'message': 'please log in'}, 401 )


class SignUp(Resource):

    def post(self):

        data = request.get_json()

        username = data['username']
        first_name = data['first_name']
        last_name = data['last_name']
        birth_date = data['birthDate']
        password = data['password']
        confirm_password = data['confirm']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        hashed_confirm_password = bcrypt.generate_password_hash(confirm_password)
        new_user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date,
            _password_hash=hashed_password,
            confirm_password = hashed_confirm_password
        )
        db.session.add(new_user)
        db.session.commit()

        return { 'message': 'User Created Successfully'}


class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter_by(username = username).first()
        

        if user is None:
            return {'error': 'Invalid username or password'}, 401

        elif user.authenticate(password) == True:
            session['user_id'] = user.id

            user.is_authenticated = True
            db.session.commit()

            result = user.user_dict()
            return make_response(jsonify(result))
        
        else:
            return {'error': 'Invalid username or password'}, 401
    

class Logout(Resource):

    def delete(self):

        user = User.query.filter(User.id == session.get('user_id')).first()
        user.is_authenticated = False
        db.session.commit()

        session['user_id'] = None
        return {}, 204
    

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        result = user.user_dict()
        return make_response(jsonify(result), 200)
    

class Exercises(Resource):
    def get(self):
        return make_response([e.to_dict() for e in Exercise.query.all()], 200)
    

class ExerciseByID(Resource):
    def get(self, id):
        if id not in [e.id for e in Exercise.query.all()]:
            return {'error': '404, Exercise not Found!'}, 404

        return make_response((Exercise.query.filter(Exercise.id==id).first()).to_dict(), 200)


class ExerciseByWorkout(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()

        workout_id = data['workout_id']
        exercise_id = data['exercise_id']

        workout = Workout.query.filter(Workout.id==workout_id).first()
        exercise = Exercise.query.filter(Exercise.id==exercise_id).first()

        workout.exercises.append(exercise)

        db.session.commit()

        return make_response(workout.to_dict())
    

class RemoveExerciseFromWorkout(Resource):
    def get(self):
        pass
    
    def delete(self, id):
        data = request.get_json()

        user = User.query.filter(User.id == session.get('user_id')).first()

        workout= Workout.query.filter_by(id=id, user_id = user.id ).first()
        if not workout:
            return {'error': "404, Workout not found or doesn't belong to the current user"}, 404

        exercise_id = data['exercise_id']
        if not exercise_id:
            return {'error': "400, Exercise ID not provided"}, 400
        
        exercise = Exercise.query.get(exercise_id)
        if not exercise:
            return {'error': "404, Exercise not found"}, 404
        
        workout.exercises.remove(exercise)
        db.session.commit()

        return make_response({'message': 'The exercise has been removed'}, 200)


class Workouts(Resource):
    def get(self):
        return make_response([w.to_dict() for w in Workout.query.all()], 200)
    
    def post(self):

        data = request.get_json()

        new_workout = Workout(
            user_id=data['user_id'],
            name=data['name']
        )
        db.session.add(new_workout)
        db.session.commit()

        return make_response(new_workout.to_dict(), 201)
    

class WorkoutById(Resource):
    def get(self,id):
        pass

    def patch(self, id):
        data = request.get_json()

        user = User.query.filter(User.id == session.get('user_id')).first()

        workout= Workout.query.filter_by(id=id, user_id = user.id ).first()
        if not workout:
            return {'error': "404, Workout not found or doesn't belong to the current user"}, 404
        
        for key in data.keys():
            setattr(workout, key, data[key])

        db.session.add(workout)
        db.session.commit()

        return make_response(workout.to_dict(), 200)
    
    def delete(self, id):

        user = User.query.filter(User.id == session.get('user_id')).first()

        workout= Workout.query.filter_by(id=id, user_id = user.id ).first()
        if not workout:
            return {'error': "404, Workout not found or doesn't belong to the current user"}, 404
        
        try:
            db.session.delete(workout)
            db.session.commit()
            return make_response({'message': 'The workout has been deleted'}, 200)
        
        except Exception as e:
            db.session.rollback()
            return make_response({'error': 'An error occurred while deleting the workout.'}, 500)
        
        



class Splits(Resource):
    def get(self):
        return make_response([s.to_dict() for s in Split.query.all()], 200)
    
    def post(self):

        data = request.get_json()

        new_split = Split(
            user_id=data['user_id'],
            name=data['name'],
            days=data['days'],
            duration=data['duration']
        )
        db.session.add(new_split)
        db.session.commit()

        return make_response(new_split.to_dict(), 201)

api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Exercises, '/exercises')
api.add_resource(ExerciseByID, '/exercises/<int:id>')
api.add_resource(Workouts, '/workouts')
api.add_resource(Splits, '/splits')
api.add_resource(ExerciseByWorkout, '/workouts/add-exercise')
api.add_resource(RemoveExerciseFromWorkout, '/workouts/remove-exercise/<int:id>')
api.add_resource(WorkoutById, '/workouts/<int:id>')


if __name__ == '__main__':
    app.run(port = 5555, debug = True)