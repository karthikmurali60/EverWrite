from pymongo import MongoClient

class Mongo:
    def client():
        MONGODB_HOST = 'mongo-db'
        MONGODB_PORT = 27017

        # Connect to MongoDB
        client = MongoClient(MONGODB_HOST, MONGODB_PORT, username='root', password='passwd')

        return client
