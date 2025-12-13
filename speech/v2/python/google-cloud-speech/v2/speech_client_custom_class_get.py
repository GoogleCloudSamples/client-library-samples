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

# [START speech_v2_speech_customclass_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2


def get_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Retrieves a specific CustomClass.

    This sample demonstrates how to retrieve details of an existing custom class
    using its ID.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to retrieve.
                          Example: "my-custom-class-123"
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name for the custom class.
    custom_class_name = client.custom_class_path(
        project=project_id, location="global", custom_class=custom_class_id
    )

    try:
        custom_class = client.get_custom_class(name=custom_class_name)

        print(f"Successfully retrieved custom class: {custom_class.name}")
        print(f"Display Name: {custom_class.display_name}")
        print(f"State: {custom_class.state.name}")
        if custom_class.items:
            print("Class Items:")
            for item in custom_class.items:
                print(f"  - {item.value}")
        else:
            print("No class items defined.")

    except NotFound:
        print(f"Error: Custom class '{custom_class_name}' not found.")
        print("Please ensure the custom class ID is correct.")
        print(
            "You can list available custom classes using the `list_custom_classes` sample."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID and custom class ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please review the error message and your environment setup.")


# [END speech_v2_speech_customclass_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific CustomClass by its ID."
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
        help="The ID of the custom class to retrieve.",
    )

    args = parser.parse_args()

    get_custom_class(args.project_id, args.custom_class_id)
