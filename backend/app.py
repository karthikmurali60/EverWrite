from flask import Flask

import routes.general
import routes.user
import routes.notes

app = Flask(__name__)

routes.general.load(app)
routes.user.load(app)
# routes.notes.load(app)

if __name__ == "__main__":
  app.run(debug=True)
