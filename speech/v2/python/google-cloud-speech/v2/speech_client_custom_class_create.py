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

# [START speech_v2_speech_customclass_create]
from google.api_core.exceptions import AlreadyExists
from google.cloud import speech_v2


def create_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """Creates a CustomClass for speech recognition to improve accuracy for domain-specific terminology.

    A CustomClass is used to provide "hints" to the speech recognizer to favor
    specific words and phrases in the results.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID to use for the CustomClass.
    """
    client = speech_v2.SpeechClient()

    # Construct the parent path for the custom class.
    parent = f"projects/{project_id}/locations/global"

    # Define the CustomClass details.
    # For demonstration, we'll create a CustomClass for common company names.
    custom_class = speech_v2.CustomClass(
        display_name="My Company Names",
        items=[
            speech_v2.CustomClass.ClassItem(value="Google"),
            speech_v2.CustomClass.ClassItem(value="Alphabet"),
            speech_v2.CustomClass.ClassItem(value="DeepMind"),
        ],
    )

    # Create the CreateCustomClassRequest.
    request = speech_v2.CreateCustomClassRequest(
        parent=parent,
        custom_class=custom_class,
        custom_class_id=custom_class_id,
    )

    try:
        operation = client.create_custom_class(request=request)
        print("Waiting for operation to complete...")
        response = operation.result()

        print(f"Successfully created custom class: {response.name}")
        print(f"Display name: {response.display_name}")
        print("Items:")
        for item in response.items:
            print(f"  - {item.value}")

    except AlreadyExists as e:
        print(
            f"Custom class '{custom_class_id}' already exists in project '{project_id}'."
        )
        print(
            "Please try a different custom_class_id or delete the existing one if you wish to recreate it."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_customclass_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a CustomClass for speech recognition."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--custom_class_id",
        type=str,
        required=True,
        help="The ID to use for the CustomClass.",
    )
    args = parser.parse_args()

    create_custom_class(
        args.project_id,
        args.custom_class_id,
    )
