from lib.mongo import Mongo

class SignIn:
    def run(request):
        model = {
            'errors': None,
            'data': None,
            'code': None
        }

        data = request.json
        username = data['username']

        client = Mongo.client()
        db = client['everwrite']
        users_collection = db['users']

        user = users_collection.find_one({'username': username})

        if user:
            model['data'] = {'msg': 'User logged in successfully'}
            model['code'] = 200
        else:
            model['errors'] = {'msg':'User not found'}
            model['code'] = 404
        
        return model
