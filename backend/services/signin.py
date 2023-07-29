from lib.mongo import Mongo

class Signin:
    def run(request):
        model = {
            'errors': None,
            'data': None
        }

        data = request.json
        username = data['username']

        client = Mongo.client()
        db = client['everwrite']
        users_collection = db['users']

        user = users_collection.find_one({'username': username})

        if user:
            model['data'] = 'User logged in successfully'
        else:
            model['errors'] = 'User not found'
        
        return model
