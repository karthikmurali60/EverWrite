from flask import request

from services.list_notes import ListNotes
from services.get_note import GetNote
from services.upsert_note import UpsertNote
from services.delete_note import DeleteNote
from flask_cors import cross_origin

from lib.helpers import model_json


def load(app):
    @app.route('/<username>/notes', methods=['GET'])
    @cross_origin()
    def list_notes(username):
        model = ListNotes.run(username)
        return model_json(model)

    @app.route('/<username>/notes/<note_id>', methods=['GET'])
    @cross_origin()
    def get_note(username, note_id):
        model = GetNote.run(note_id)
        return model_json(model)

    @app.route('/<username>/notes', methods=['PUT'])
    @cross_origin()
    def create_note(username):
        model = UpsertNote.run(request)
        return model_json(model)

    @app.route('/notes/<note_id>', methods=['DELETE'])
    @cross_origin()
    def delete_note(note_id):
        model = DeleteNote.run(note_id)
        return model_json(model)
