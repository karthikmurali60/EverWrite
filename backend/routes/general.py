from flask import jsonify

def load(app):
  @app.route('/api/health-check', methods=['GET'])
  def health_check():
    return jsonify({'message': 'Server is up and running'}), 200