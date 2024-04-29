from flask import Flask
from flask_cors import CORS
from app.api.routes import api


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all domains on all routes
    app.register_blueprint(api)
    return app
