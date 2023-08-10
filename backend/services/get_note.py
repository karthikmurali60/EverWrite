from lib.mongo import Mongo
from lib.MongoJSONEncoder import MongoJSONEncoder
import json
from bson.objectid import ObjectId

class GetNote:
    def run(note_id):
        model = {
            'errors': None,
            'data': None,
            'code': None
        }
        if not ObjectId.is_valid(note_id):
            model['errors'] = {'msg': "Invalid note_id"}
            model['code'] = 400
            return model
        
        client = Mongo.client()
        db = client['everwrite']
        notes_collection = db['notes']

        note = notes_collection.find_one({'_id': ObjectId(note_id)})
        if note is None:
            model['data'] = []
            model['code'] = 404
        else:
            model['data'] = json.loads(MongoJSONEncoder().encode(note))
            model['code'] = 200
        return model
