from datetime import datetime, date
from io import BytesIO
from PIL import Image
import json
import base64, os
from flask import jsonify, url_for, current_app
from app.utils.prompt_helpers import get_gpt_prompt_template
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from openai import OpenAI

client = OpenAI()


def generate_image_description(data):
    input_dict = {
        "personality": data["person"]["personality"],
        "taste": data["person"]["taste"],
        "art_type": data["idea"]["art_type"],
        "description": data["idea"]["description"],
    }

    print(f"Checking the input dict {input_dict}")

    gpt_prompt = get_gpt_prompt_template()
    chain = gpt_prompt | ChatOpenAI() | StrOutputParser()
    response = chain.invoke(input_dict)
    return response


def save_prompt_and_url_to_json(revised_prompt, image_url):
    file_name = f"{date.today().isoformat()}_images_prompts.json"
    file_path = os.path.join(current_app.config["DYNAMIC_FOLDER_PROMPTS"], file_name)

    data = {"revised_prompt": revised_prompt, "image_url": image_url}

    if os.path.exists(file_path):
        with open(file_path, "r+") as file:
            try:
                existing_data = json.load(file)
                existing_data.append(data)
                file.seek(0)
                json.dump(existing_data, file, indent=4)
                file.truncate()
            except json.JSONDecodeError:
                file.seek(0)
                json.dump([data], file, indent=4)
                file.truncate()
    else:
        with open(file_path, "w") as file:
            json.dump([data], file, indent=4)


def generate_image(response):
    try:
        # Assuming client is properly initialized somewhere
        image = client.images.generate(
            model="dall-e-3", prompt=response, response_format="b64_json"
        )

        revised_prompt = image.data[0].revised_prompt

        # Generate a unique filename and save the image
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        prompt_snippet = "".join(filter(str.isalnum, response[-10:]))
        filename = f"{timestamp}_{prompt_snippet}.png"
        image_url = os.path.join(current_app.config["DYNAMIC_IMAGE_FOLDER"], filename)
        dynamic_image_url = url_for("api.dynamic_image", filename=filename)

        image_data = base64.b64decode(image.data[0].b64_json)
        image_stream = BytesIO(image_data)
        image = Image.open(image_stream)
        image.save(image_url)

        save_prompt_and_url_to_json(revised_prompt, dynamic_image_url)

        return jsonify({"url": dynamic_image_url}), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
