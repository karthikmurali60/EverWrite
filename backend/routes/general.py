from flask import jsonify

def load(app):
  @app.route('/health-check', methods=['GET'])
  def health_check():
    return jsonify({'message': 'Server is up and running'}), 200