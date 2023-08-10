from lib.mongo import Mongo
from bson.objectid import ObjectId


class DeleteNote:
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

        note = notes_collection.delete_one({'_id': ObjectId(note_id)})
        if note.deleted_count==0:
            model['data'] = []
            model['code'] = 404
        else:
            model['data'] = {'msg': 'Note deleted successfully'}
            model['code'] = 200
        return model
