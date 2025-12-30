from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import random
import time
from datetime import datetime
import threading
import json
import os

app = Flask(__name__, static_folder='../frontend')
CORS(app)

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
