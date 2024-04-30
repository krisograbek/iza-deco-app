from flask import Blueprint, request, jsonify, send_from_directory, current_app
from app.services.image_processing import get_image_information
from app.services.image_generation import generate_image_description, generate_image

api = Blueprint("api", __name__)


@api.route("/images/<filename>")
def dynamic_image(filename):
    return send_from_directory(current_app.config["DYNAMIC_IMAGE_FOLDER"], filename)


@api.route("/generateImage", methods=["POST"])
def generate_image_route():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    description = generate_image_description(data)
    response, status_code = generate_image(description)
    return response, status_code


# Assuming generate_image in image_generation.py uses dynamic_image_url


vision_prompt = """
Given the image, provide the following information:
- a detailed description of the interior design
- a personality and taste of the person who loves spending time in the place on the image
- a list of 5 poster decorations that would perfectly match the exisiting design with person's taste and personality
"""


@api.route("/generateIdeas", methods=["POST"])
def generate_ideas():
    if "image" not in request.files:
        return jsonify({"error": "No image part"}), 400

    image_file = request.files["image"]
    # text = request.form.get("text", "")

    # Assuming get_image_information returns the full response
    response = get_image_information(image_file, vision_prompt)
    return jsonify(response), 200
