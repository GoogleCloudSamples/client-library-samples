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

# [START translate_v3_translationservice_glossaryentry_delete]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import NotFound, GoogleAPICallError

def delete_glossary_entry(
    project_id: str,
    location: str,
    glossary_id: str,
    glossary_entry_id: str,
) -> None:
    """
    Deletes a single glossary entry from a glossary.

    A glossary entry is a specific term or phrase within a larger glossary
    that provides custom translation for that term. Deleting it removes
    its custom translation behavior.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary from which to delete the entry.
        glossary_entry_id: The ID of the glossary entry to delete.
    """
    # Arrange: Instantiate the client
    client = translate.TranslationServiceClient()
    # The client will be closed automatically when the function exits.

    # Construct the full resource name for the glossary entry.
    # For example: projects/project-id/locations/us-central1/glossaries/glossary-id/glossaryEntries/glossary-entry-id
    name = client.glossary_entry_path(
        project_id,
        location,
        glossary_id,
        glossary_entry_id,
    )

    try:
        # Act: Execute the API call to delete the glossary entry.
        client.delete_glossary_entry(name=name)

        # Assert: Print a success message.
        print(
            f"Glossary entry '{glossary_entry_id}' deleted successfully from glossary '{glossary_id}'."
        )
    except NotFound:
        print(
            f"Glossary entry '{glossary_entry_id}' not found in glossary '{glossary_id}'. "
            "It may have already been deleted or never existed."
        )
    except GoogleAPICallError as e:
        # Handle other API-specific errors.
        print(f"An API error occurred: {e}")
    except Exception as e:
        # Handle any other unexpected errors.
        print(f"An unexpected error occurred: {e}")

# [END translate_v3_translationservice_glossaryentry_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--project_id",
        type=str,
        default="your-project-id",  # TODO(developer): Replace with your Google Cloud Project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Or your preferred location
        help="The geographic location of the glossary (e.g., us-central1).",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="my-glossary-id",  # TODO(developer): Replace with an existing glossary ID
        help="The ID of the glossary from which to delete the entry.",
    )
    parser.add_argument(
        "--glossary_entry_id",
        type=str,
        default="my-glossary-entry-id",  # TODO(developer): Replace with an existing glossary entry ID
        help="The ID of the glossary entry to delete.",
    )

    args = parser.parse_args()

    delete_glossary_entry(
        args.project_id,
        args.location,
        args.glossary_id,
        args.glossary_entry_id,
    )
