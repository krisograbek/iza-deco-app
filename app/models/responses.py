from pydantic import BaseModel, Field


class ArtSuggestion(BaseModel):
    art_type: str = Field(description="The type of the poster to be created.")
    description: str = Field(description="A detailed description of the poster.")


class Person(BaseModel):
    personality: str = Field(description="Brief description of person's personality.")
    taste: str = Field(description="Keywords describing the taste of the person.")


class Response(BaseModel):
    design: str = Field(
        description="Detailed interior design description from the image."
    )
    person: Person
    art_suggestions: list[ArtSuggestion] = Field(
        default_factory=list,
        description="List of decorations that match the personality and taste.",
    )
