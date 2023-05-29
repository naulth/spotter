from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User


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




api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


if __name__ == '__main__':
    app.run(port = 5555, debug = True)