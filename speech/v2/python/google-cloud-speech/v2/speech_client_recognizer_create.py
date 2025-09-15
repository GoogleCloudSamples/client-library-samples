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

# [START speech_v2_recognizer_create]
from google.api_core import exceptions
from google.cloud import speech_v2


def create_recognizer(
    project_id: str,
    recognizer_id: str,
    display_name: str,
) -> None:
    """
    Creates a new Speech-to-Text Recognizer resource.

    Args:
        project_id: The Google Cloud project ID.
        recognizer_id: The ID to use for the Recognizer, which will become
            the final component of the Recognizer's resource name.
        display_name: A user-settable, human-readable name for the Recognizer.
    """
    client = speech_v2.SpeechClient()
    # The parent resource where this Recognizer will be created.
    parent = f"projects/{project_id}/locations/global"

    # Configure the default recognition settings for the recognizer.
    # For this example, we use auto-detection for audio encoding and a single language.
    recognizer_config = speech_v2.RecognitionConfig(
        auto_decoding_config=speech_v2.AutoDetectDecodingConfig(),
        language_codes=["en-US"],  # Specify the language code for recognition
        model="long",  # Supported models: https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages
    )

    # Create a Recognizer object with the specified display name and default config.
    recognizer_obj = speech_v2.Recognizer(
        display_name=display_name,
        default_recognition_config=recognizer_config,
    )

    # Construct the CreateRecognizerRequest.
    request = speech_v2.CreateRecognizerRequest(
        parent=parent,
        recognizer=recognizer_obj,
        recognizer_id=recognizer_id,
    )

    print(f"Creating recognizer '{recognizer_id}' in '{parent}'...")

    try:
        operation = client.create_recognizer(request=request)
        # Wait for the long-running operation to complete.
        response = operation.result()

        print(f"Successfully created recognizer: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Model Name: {response.model}")
        print(f"State: {response.state.name}")

    except exceptions.AlreadyExists as e:
        print(
            f"Recognizer '{recognizer_id}' already exists in '{parent}'. "
            f"Please choose a unique recognizer ID or delete the existing one. "
            f"Details: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(
            f"An API error occurred while creating recognizer '{recognizer_id}': "
            f"{e.message}. Please check your project ID and permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_recognizer_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new Google Cloud Speech-to-Text Recognizer."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--recognizer_id",
        type=str,
        required=True,
        help=("The ID for the recognizer. Example: 'my-recognizer-123'"),
    )
    parser.add_argument(
        "--display_name",
        type=str,
        default="My New Recognizer",
        help="A human-readable name for the recognizer.",
    )

    args = parser.parse_args()

    create_recognizer(
        args.project_id,
        args.recognizer_id,
        args.display_name,
    )
