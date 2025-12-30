from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
from backend.manager import api
import os

app = Flask(__name__, 
            static_folder='frontend',
            template_folder='frontend')
CORS(app)

# Register API blueprint
app.register_blueprint(api)

# Serve frontend files
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/home')
def serve_home():
    return send_from_directory(app.static_folder, 'home.html')

@app.route('/player/<movie_id>')
def serve_player(movie_id):
    return send_from_directory(app.static_folder, 'player.html')

@app.route('/categories')
def serve_categories():
    return send_from_directory(app.static_folder, 'categories.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# API endpoint
@app.route('/api/status')
def api_status():
    return jsonify({
        "status": "online",
        "service": "Seal Movies API",
        "version": "1.0.0"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
