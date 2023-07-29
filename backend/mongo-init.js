conn = new Mongo();
db = conn.getDB("everwrite");

db.createCollection("users");
db.createCollection("notes");
