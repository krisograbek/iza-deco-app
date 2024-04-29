from flask import Blueprint, request, jsonify
from app.services.image_processing import get_image_information

api = Blueprint("api", __name__)

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
