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

# [START translate_v3_translationservice_supportedlanguages_get]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import GoogleAPICallError

def get_supported_languages_sample(
    project_id: str,
    location: str,
) -> None:
    """
    Lists the supported languages for translation in a given project and location.

    This function demonstrates how to retrieve a list of languages that the
    Translation API supports for translation, along with their display names
    in a specified language.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the translation service (e.g., 'global' or 'us-central1').
    """
    client = translate.TranslationServiceClient()

    # The `parent` field can be either a project-level or location-level resource.
    # For global languages, use 'global' as the location.
    # Example: 'projects/your-project-id/locations/global'
    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.get_supported_languages(
            parent=parent,
            display_language_code="en",  # Display language names in English
        )

        print(f"Supported languages for project '{project_id}' in location '{location}':")
        for language in response.languages:
            print(f"  Language Code: {language.language_code}, Display Name: {language.display_name}")

    except GoogleAPICallError as e:
        print(f"Error getting supported languages: {e}")
        # Common errors include:
        # - Permission denied (403): Ensure the service account has 'Cloud Translation API User' role.
        # - Invalid argument (400): Check if the 'location' is valid.
        print("Please check your project ID, location, and ensure the Cloud Translation API is enabled.")

# [END translate_v3_translationservice_supportedlanguages_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List supported languages for Google Cloud Translation API."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the translation service (e.g., 'global' or 'us-central1').",
    )

    args = parser.parse_args()

    get_supported_languages_sample(args.project_id, args.location)
