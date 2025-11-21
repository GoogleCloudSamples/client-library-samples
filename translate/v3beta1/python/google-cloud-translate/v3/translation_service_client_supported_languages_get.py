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
import sys

# [START translate_v3beta1_translationservice_supportedlanguages_get]
from google.cloud import translate_v3beta1 as translate
from google.api_core.exceptions import InvalidArgument

def get_supported_languages_sample(project_id: str, location: str) -> None:
    """
    Retrieves and prints the list of supported languages for translation.

    This sample demonstrates how to use the `get_supported_languages` method
    to fetch all languages supported by the Cloud Translation API for a given
    project and location. It also shows how to display the language names
    in a specific language (e.g., English).

    Args:
        project_id: The Google Cloud project ID.
        location: The location to list supported languages from.
                  For global calls, use 'global'.
                  Example: 'us-central1' or 'global'.
    """
    client = translate.TranslationServiceClient()

    # The `parent` parameter can be in the format "projects/{project_id}/locations/{location_id}"
    # or "projects/{project_id}". For listing supported languages, 'global' is a common location.
    # Non-global location is required for AutoML models.
    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.get_supported_languages(
            parent=parent,
            display_language_code="en",  # Optional: display language names in English
        )

        print(f"Supported languages for project '{project_id}' in location '{location}':")
        for language in response.languages:
            print(f"  Language Code: {language.language_code}")
            print(f"  Display Name: {language.display_name}")
            print(f"  Supports as Source: {language.support_source}")
            print(f"  Supports as Target: {language.support_target}")
            print("-" * 20)

    except InvalidArgument as e:
        print(f"Error: Invalid argument provided. Please check your project ID and location.", file=sys.stderr)
        print(f"Details: {e}", file=sys.stderr)
        print(f"Ensure the parent format is correct: 'projects/{{project_id}}/locations/{{location_id}}'.", file=sys.stderr)
        print(f"For global supported languages, use location 'global'.", file=sys.stderr)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)

# [END translate_v3beta1_translationservice_supportedlanguages_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List supported languages for Google Cloud Translation API."
    )
    parser.add_argument(
        "project_id",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "location",
        help="The location to list supported languages from (e.g., 'global' or 'us-central1').",
    )
    args = parser.parse_args()

    get_supported_languages_sample(args.project_id, args.location)
