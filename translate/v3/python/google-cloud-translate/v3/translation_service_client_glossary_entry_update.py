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

# [START translate_v3_translationservice_glossaryentry_update]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import NotFound

def update_glossary_entry_sample(
    project_id: str,
    location: str,
    glossary_id: str,
    glossary_entry_id: str,
    source_text: str,
    target_text: str,
) -> None:
    """
    Updates a glossary entry in the Google Cloud Translation API.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to which the entry belongs.
        glossary_entry_id: The ID of the glossary entry to update.
        source_text: The new source text for the glossary entry.
        target_text: The new target text for the glossary entry.
    """
    client = translate.TranslationServiceClient()

    # Construct the full resource name for the glossary entry
    # Example: projects/PROJECT_ID/locations/LOCATION_ID/glossaries/GLOSSARY_ID/glossaryEntries/GLOSSARY_ENTRY_ID
    glossary_entry_name = client.glossary_entry_path(
        project_id,
        location,
        glossary_id,
        glossary_entry_id,
    )

    # Prepare the updated glossary entry object
    updated_glossary_entry = translate.GlossaryEntry(
        name=glossary_entry_name,
        terms_pair=translate.GlossaryEntry.GlossaryTermsPair(
            source_term=translate.GlossaryTerm(language_code="en", text=source_text),
            target_term=translate.GlossaryTerm(language_code="es", text=target_text),
        ),
    )

    try:
        # Make the API call to update the glossary entry
        response = client.update_glossary_entry(glossary_entry=updated_glossary_entry)

        print(f"Updated glossary entry: {response.name}")
        print(f"Source text: {response.terms_pair.source_term.text}")
        print(f"Target text: {response.terms_pair.target_term.text}")

    except NotFound:
        print(
            f"Glossary entry '{glossary_entry_name}' not found. "
            "Please ensure the project, location, glossary, and entry IDs are correct."
        )
    except Exception as e:
        print(f"An error occurred: {e}")

# [END translate_v3_translationservice_glossaryentry_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a glossary entry in the Google Cloud Translation API."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # Replace with your Google Cloud Project ID
        help="Your Google Cloud Project ID.",
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
        default="my-updated-glossary",  # Replace with your glossary ID
        help="The ID of the glossary to which the entry belongs.",
    )
    parser.add_argument(
        "--glossary_entry_id",
        type=str,
        default="my-entry-1",  # Replace with the ID of the entry to update
        help="The ID of the glossary entry to update.",
    )
    parser.add_argument(
        "--source_text",
        type=str,
        default="updated source term",
        help="The new source text for the glossary entry.",
    )
    parser.add_argument(
        "--target_text",
        type=str,
        default="término de origen actualizado",
        help="The new target text for the glossary entry.",
    )

    args = parser.parse_args()

    update_glossary_entry_sample(
        args.project_id,
        args.location,
        args.glossary_id,
        args.glossary_entry_id,
        args.source_text,
        args.target_text,
    )
