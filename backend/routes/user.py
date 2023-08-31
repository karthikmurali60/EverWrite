from flask import request

from services.signup import SignUp
from services.signin import SignIn
from flask_cors import cross_origin

from lib.helpers import model_json

def load(app):
    @app.route('/api/signup', methods=['POST'])
    @cross_origin()
    def signup():
        model = SignUp.run(request)
        return model_json(model)

    @app.route('/api/signin', methods=['POST'])
    @cross_origin()
    def signin():
        model = SignIn.run(request)
        return model_json(model)
