from lib.mongo import Mongo
from bson.objectid import ObjectId
from datetime import datetime, timezone


class UpsertNote:
    def run(request):
        model = {
            'errors': None,
            'data': None,
            'code': None
        }

        data = request.json
        now = datetime.now(timezone.utc).isoformat()

        if '_id' in data and not ObjectId.is_valid(data['_id']):
            model['errors'] = {'msg': "Invalid note_id"}
            model['code'] = 400
            return model

        if 'title' not in data or 'content' not in data or 'username' not in data or 'tags' not in data:
            model['errors'] = {'msg': "Invalid JSON"}
            model['code'] = 422
            return model

        client = Mongo.client()
        db = client['everwrite']
        notes_collection = db['notes']
        if '_id' in data:
            note = notes_collection.find_one({'_id': ObjectId(data['_id'])})
            if note is None:
                model['errors'] = {'msg': "Note not found"}
                model['code'] = 404
                return model
            notes_collection.update_one({'_id': ObjectId(data['_id'])}, {'$set': {'title': data['title'], 'content': data['content'],
                                        'tags': data['tags'], 'updated_at': now, 'deleted': data['deleted'] if 'deleted' in data else False}})
            model['data'] = {'msg': 'Note updated successfully'}
            model['code'] = 200
        else:
            document = notes_collection.insert_one({'title': data['title'], 'content': data['content'],
                                        'username': data['username'], 'tags': data['tags'], 'created_at': now, 'updated_at': now, 'deleted': False})

            model['data'] = {'msg': 'Note created successfully', 'note_id': str(document.inserted_id)}
            model['code'] = 201
        return model
