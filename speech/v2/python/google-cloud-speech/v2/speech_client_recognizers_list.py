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

# [START speech_v2_speech_recognizers_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import speech_v2


def list_recognizers(project_id: str) -> None:
    """
    Lists all recognizers available in a given Google Cloud project.

    This function demonstrates how to retrieve a list of speech recognizers,
    which are configurations for performing speech-to-text operations.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech_v2.SpeechClient()

    # Construct the parent path for listing recognizers.
    parent = f"projects/{project_id}/locations/global"

    try:
        print(f"Listing recognizers in {parent}...")
        recognizers = client.list_recognizers(parent=parent)

        found_recognizers = False
        for recognizer in recognizers:
            found_recognizers = True
            print(f"Recognizer found: {recognizer.name}")
            print(f"  Display Name: {recognizer.display_name}")
            print(f"  State: {recognizer.state.name}")
            print(f"  Creation Time: {recognizer.create_time.isoformat()}")
            if recognizer.default_recognition_config.model:
                print(f"  Default Model: {recognizer.default_recognition_config.model}")
            if recognizer.default_recognition_config.language_codes:
                print(
                    f"  Default Language Codes: {', '.join(recognizer.default_recognition_config.language_codes)}"
                )

        if not found_recognizers:
            print(f"No recognizers found in {parent}.")

    except GoogleAPICallError as e:
        # Handle API errors, such as permissions issues or invalid location.
        print(f"Error listing recognizers: {e}")
        if e.code == 404:
            print(
                "Please ensure the project ID is correct and that "
                "the Speech-to-Text API is enabled for your project."
            )
        elif e.code == 403:
            print(
                "Permission denied. Ensure your service account has the "
                "'roles/speech.viewer' or 'roles/editor' role."
            )
        else:
            print("An unexpected API error occurred.")


# [END speech_v2_speech_recognizers_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all recognizers in a given Google Cloud project.."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
    )
    args = parser.parse_args()

    list_recognizers(args.project_id)
