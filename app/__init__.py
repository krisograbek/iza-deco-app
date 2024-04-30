from flask import Flask
from flask_cors import CORS
import os

IMAGES_DIR = "images"
DYNAMIC_IMAGE_FOLDER = os.path.join(os.getcwd(), IMAGES_DIR)

PROMPTS_DIR = "saved_prompts"
DYNAMIC_FOLDER_PROMPTS = os.path.join(os.getcwd(), PROMPTS_DIR)


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all domains on all routes
    app.config["IMAGES_DIR"] = IMAGES_DIR
    app.config["DYNAMIC_IMAGE_FOLDER"] = DYNAMIC_IMAGE_FOLDER

    app.config["PROMPTS_DIR"] = PROMPTS_DIR
    app.config["DYNAMIC_FOLDER_PROMPTS"] = DYNAMIC_FOLDER_PROMPTS

    from app.api.routes import api

    app.register_blueprint(api)

    return app
