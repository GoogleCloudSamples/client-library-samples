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

# [START speech_v2_speech_recognizer_get]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v2


def get_speech_recognizer(
    project_id: str,
    recognizer_id: str,
) -> None:
    """
    Retrieves a specific Speech Recognizer.

    A Recognizer is a resource that stores configuration and metadata for speech
    recognition tasks. This function demonstrates how to fetch the details of
    an existing Recognizer by its unique identifier.

    Args:
        project_id: The Google Cloud project ID.
        recognizer_id: The ID of the Recognizer to retrieve.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name for the recognizer.
    recognizer_name = client.recognizer_path(
        project_id, location="global", recognizer=recognizer_id
    )

    try:
        recognizer = client.get_recognizer(name=recognizer_name)
        print(f"Successfully retrieved recognizer: {recognizer.name}")
        print(f"Display Name: {recognizer.display_name}")
        print(f"State: {recognizer.state.name}")
        if recognizer.default_recognition_config:
            print(
                f"Default Recognition Config Model: {recognizer.default_recognition_config.model}"
            )

    except NotFound:
        print(f"Recognizer '{recognizer_name}' not found.")
        print("Please ensure the project ID, location, and recognizer ID are correct.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END speech_v2_speech_recognizer_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Speech Recognizer."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--recognizer_id",
        type=str,
        required=True,
        help="The ID of the Recognizer to retrieve.",
    )

    args = parser.parse_args()

    get_speech_recognizer(args.project_id, args.recognizer_id)
