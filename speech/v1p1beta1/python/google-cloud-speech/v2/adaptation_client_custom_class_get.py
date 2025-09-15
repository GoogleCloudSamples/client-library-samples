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

# [START speech_v1p1beta1_adaptation_customclass_get]
from google.api_core import exceptions
from google.cloud import speech_v1p1beta1


def get_custom_class_sample(project_id: str, custom_class_id: str) -> None:
    """Retrieves a custom class from Google Cloud Speech-to-Text.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to retrieve.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full resource name of the custom class.
    name = client.custom_class_path(
        project=project_id, location="global", custom_class=custom_class_id
    )

    try:
        custom_class = client.get_custom_class(name=name)

        print(f"Successfully retrieved custom class: {custom_class.name}")
        if custom_class.items:
            print("Items:")
            for item in custom_class.items:
                print(f"  - {item.value}")
        else:
            print("No items found in this custom class.")

    except exceptions.NotFound:
        print(f"Error: Custom class '{name}' not found.")
        print(
            "Please ensure the project ID, location, and custom class ID are correct."
        )
        print(
            "You might need to create the custom class first using the "
            "`create_custom_class_sample`."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_customclass_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a custom class from Google Cloud Speech-to-Text."
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

    get_custom_class_sample(args.project_id, args.custom_class_id)
