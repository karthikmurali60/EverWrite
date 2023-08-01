from flask import Flask
from flask_cors import CORS

import routes.general
import routes.user
import routes.notes

app = Flask(__name__)
cors = CORS(app)

routes.general.load(app)
routes.user.load(app)
routes.notes.load(app)

if __name__ == "__main__":
  app.run(debug=True)
