from app.utils.transform_chain import load_image_chain
from app.models.responses import Response
from langchain_core.runnables import chain
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI

parser = JsonOutputParser(pydantic_object=Response)


@chain
def image_model(inputs: dict) -> dict:
    model = ChatOpenAI(temperature=0.5, model="gpt-4-vision-preview", max_tokens=1024)
    msg = model.invoke(
        [
            HumanMessage(
                content=[
                    {"type": "text", "text": inputs["prompt"]},
                    {"type": "text", "text": parser.get_format_instructions()},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{inputs['image']}"
                        },
                    },
                ]
            )
        ]
    )
    return msg.content


def get_image_information(image_file, prompt: str) -> dict:
    vision_chain = load_image_chain | image_model | parser
    vision_response = vision_chain.invoke({"image_file": image_file, "prompt": prompt})
    print(f"Vision response: {vision_response}")
    return vision_response
