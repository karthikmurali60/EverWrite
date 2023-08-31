from pymongo import MongoClient
import os

class Mongo:
    def client():
        # Connect to MongoDB
        client = MongoClient(os.environ['MONGO_URL'])

        return client
