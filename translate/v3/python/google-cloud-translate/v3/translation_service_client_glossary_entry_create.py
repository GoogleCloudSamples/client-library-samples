# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START translate_v3_translationservice_glossaryentry_create]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import AlreadyExists

def create_glossary_entry(
    project_id: str,
    location: str,
    glossary_id: str,
    source_text: str,
    target_text: str,
) -> None:
    """
    Creates a glossary entry within an existing glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to add the entry to.
        source_text: The source term for the glossary entry.
        target_text: The target term for the glossary entry.
    """
    client = translate.TranslationServiceClient()

    # Construct the parent path for the glossary
    # Example: projects/my-project/locations/us-central1/glossaries/my-glossary
    parent = client.glossary_path(project_id, location, glossary_id)

    # Define the source and target terms for the glossary entry
    source_term = translate.GlossaryTerm(language_code="en", text=source_text)
    target_term = translate.GlossaryTerm(language_code="es", text=target_text)

    # Create a GlossaryTermsPair for the unidirectional entry
    terms_pair = translate.GlossaryEntry.GlossaryTermsPair(
        source_term=source_term,
        target_term=target_term,
    )

    # Create the GlossaryEntry object
    glossary_entry = translate.GlossaryEntry(terms_pair=terms_pair)

    try:
        # Send the request to create the glossary entry
        response = client.create_glossary_entry(parent=parent, glossary_entry=glossary_entry)
        print(f"Created glossary entry: {response.name}")
        print(f"Source term: {response.terms_pair.source_term.text} ({response.terms_pair.source_term.language_code})")
        print(f"Target term: {response.terms_pair.target_term.text} ({response.terms_pair.target_term.language_code})")
    except AlreadyExists as e:
        print(f"Glossary entry already exists in {parent}: {e}")
        print("Consider updating the existing entry if you want to change its definition.")
    except Exception as e:
        print(f"Failed to create glossary entry: {e}")

# [END translate_v3_translationservice_glossaryentry_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a glossary entry in Google Cloud Translation."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="my-glossary-12345",
        help="The ID of the glossary to add the entry to. "
        "This glossary must already exist.",
    )
    parser.add_argument(
        "--source_text",
        type=str,
        default="hello",
        help="The source term for the glossary entry (e.g., 'hello').",
    )
    parser.add_argument(
        "--target_text",
        type=str,
        default="hola",
        help="The target term for the glossary entry (e.g., 'hola').",
    )

    args = parser.parse_args()

    create_glossary_entry(
        project_id=args.project_id,
        location=args.location,
        glossary_id=args.glossary_id,
        source_text=args.source_text,
        target_text=args.target_text,
    )
