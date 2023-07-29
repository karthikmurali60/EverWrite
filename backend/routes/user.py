from flask import request

from services.signup import Signup
from services.signin import Signin

from lib.helpers import model_json

def load(app):
    @app.route('/signup', methods=['POST'])
    def signup():
        model = Signup.run(request)
        return model_json(model)

    @app.route('/signin', methods=['POST'])
    def signin():
        model = Signin.run(request)
        return model_json(model)
