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

# [START speech_v1_adaptation_customclass_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError, NotFound
from google.cloud import speech_v1 as speech


def create_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """Creates a custom class for speech adaptation.

    A custom class represents a common concept likely to appear in audio, such as
    a list of specific colors, names, or items. These can be used within PhraseSets
    to improve recognition accuracy for specific terms.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID to use for the custom class. This will be the final
                         component of the custom class's resource name.
    """
    client = speech.AdaptationClient()

    # The parent resource where this custom class will be created.
    parent = client.common_location_path(project_id, location="global")

    # Example values
    class_items = [
        speech.CustomClass.ClassItem(value="apple"),
        speech.CustomClass.ClassItem(value="banana"),
        speech.CustomClass.ClassItem(value="orange"),
    ]

    custom_class = speech.CustomClass(
        items=class_items,
    )

    request = speech.CreateCustomClassRequest(
        parent=parent,
        custom_class_id=custom_class_id,
        custom_class=custom_class,
    )

    try:
        response = client.create_custom_class(request=request)

        print(f"Successfully created custom class: {response.name}")
        print("Items:")
        for item in response.items:
            print(f"- {item.value}")

    except AlreadyExists as e:
        print(f"Error: Custom class '{custom_class_id}' already exists in {parent}.")
        print("Consider updating the existing custom class or choosing a different ID.")
        print(f"Details: {e}")
    except NotFound as e:
        print(f"Error: Parent resource '{parent}' not found.")
        print("Please ensure the project ID is correct and exist.")
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(f"Error code: {e.code}")
        print("Please check your request parameters and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_customclass_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a custom class for Speech-to-Text adaptation."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--custom_class_id",
        type=str,
        required=True,
        help="The ID for the custom class (e.g., 'my-color-class').",
    )

    args = parser.parse_args()

    create_custom_class(
        project_id=args.project_id,
        custom_class_id=args.custom_class_id,
    )
