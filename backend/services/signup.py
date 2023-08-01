from lib.mongo import Mongo
from datetime import datetime, timezone


class SignUp:
    def run(request):
        model = {
            'errors': None,
            'data': None,
            'code': None
        }

        data = request.json
        name = data['name']
        username = data['username']
        now = datetime.now(timezone.utc).astimezone()

        client = Mongo.client()
        db = client['everwrite']
        users_collection = db['users']

        if users_collection.find_one({'username': username}):
            model['errors'] = {'msg': 'Username already exists'}
            model['code'] = 409
        else:
            user = {'name': name, 'username': username, 'created_at': now}
            users_collection.insert_one(user)
            model['data'] = {'msg': 'User registered successfully'}
            model['code'] = 201
        
        return model
