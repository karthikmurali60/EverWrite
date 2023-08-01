from lib.mongo import Mongo
from lib.MongoJSONEncoder import MongoJSONEncoder
import json

class ListNotes:
    def run(username):
        model = {
            'errors': None,
            'data': None,
            'code': None
        }
        client = Mongo.client()
        db = client['everwrite']
        users_collection = db['users']
        notes_collection = db['notes']

        # if users_collection.find_one({'username': username}) is None:
        #     model['errors'] = {'msg': 'User not found'}
        #     model['code'] = 404
        # else:
        user_notes = notes_collection.find({'username': username})
        model['data'] = json.loads(MongoJSONEncoder().encode(list(user_notes)))
        model['code'] = 200
        return model