import base64
from langchain.chains import TransformChain


def load_image(inputs: dict) -> dict:
    """Load image from file and encode it as base64."""
    image_file = inputs["image_file"]
    image_base64 = base64.b64encode(image_file.read()).decode("utf-8")
    return {"image": image_base64}


load_image_chain = TransformChain(
    input_variables=["image_file"], output_variables=["image"], transform=load_image
)
