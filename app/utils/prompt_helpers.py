from langchain_core.prompts import PromptTemplate

gpt_prompt_text = """
Create a detailed description for a poster to hang on a wall for the person:
Personality of the person: <{personality}>,
Taste of the person: <{taste}>,

Here's additional information about the poster:
Art type: <{art_type}>,
Description: <{description}>.

You will only describe the piece of art.
"""


def get_gpt_prompt_template():
    return PromptTemplate.from_template(gpt_prompt_text)
