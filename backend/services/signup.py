from lib.mongo import Mongo
from datetime import datetime, timezone


class Signup:
    def run(request):
        model = {
            'errors': None,
            'data': None
        }

        data = request.json
        name = data['name']
        username = data['username']
        now = datetime.now(timezone.utc).astimezone()

        client = Mongo.client()
        db = client['everwrite']
        users_collection = db['users']

        if users_collection.find_one({'username': username}):
            model['errors'] = 'Username already exists'
        else:
            user = {'name': name, 'username': username, 'created_at': now}
            users_collection.insert_one(user)
            model['data'] = 'User registered successfully'
        
        return model
