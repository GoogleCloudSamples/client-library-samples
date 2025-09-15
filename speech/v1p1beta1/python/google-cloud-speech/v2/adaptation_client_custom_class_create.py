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

# [START speech_v1p1beta1_adaptation_customclass_create]
from google.api_core import exceptions
from google.cloud import speech_v1p1beta1


def create_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Create a custom class for speech adaptation.

    Custom classes allow you to define a list of words or phrases that represent
    a common concept. These can then be used in PhraseSets to improve speech
    recognition accuracy for specific terms, such as product names or proper nouns.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID to use for the custom class, which will become
            the final component of the custom class's resource name.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the parent resource path
    parent = client.common_location_path(project_id, location="global")

    # Define class items for the custom class
    class_items = [
        speech_v1p1beta1.CustomClass.ClassItem(value="Google"),
        speech_v1p1beta1.CustomClass.ClassItem(value="Cloud"),
        speech_v1p1beta1.CustomClass.ClassItem(value="Speech-to-Text"),
    ]

    # Create the CustomClass object
    custom_class = speech_v1p1beta1.CustomClass(
        items=class_items,
    )

    try:
        response = client.create_custom_class(
            parent=parent,
            custom_class_id=custom_class_id,
            custom_class=custom_class,
        )

        print(f"Created custom class: {response.name}")
        print("Items:")
        for item in response.items:
            print(f"- {item.value}")

    except exceptions.AlreadyExists as e:
        print(
            f"Custom class '{custom_class_id}' already exists in '{parent}'. "
            f"Consider using an existing custom class or a different ID. Error: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error creating custom class: {e}")


# [END speech_v1p1beta1_adaptation_customclass_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a custom class for speech adaptation."
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
        help="The ID for the custom class.",
    )

    args = parser.parse_args()

    create_custom_class(
        project_id=args.project_id,
        custom_class_id=args.custom_class_id,
    )
