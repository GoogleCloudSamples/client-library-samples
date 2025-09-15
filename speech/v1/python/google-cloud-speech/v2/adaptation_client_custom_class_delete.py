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

# [START speech_v1_adaptation_customclass_delete]
from google.api_core import exceptions
from google.cloud import speech_v1


def delete_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """Deletes a custom class.

    This sample demonstrates how to delete a custom class, which is used to
    improve speech recognition accuracy for specific words or phrases.
    Deleting a custom class removes it from your project, making it
    unavailable for future speech recognition requests.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to delete.
                         This is the last component of the custom class's resource name.
                         Example: "my-custom-class-id".
    """
    client = speech_v1.AdaptationClient()

    name = client.custom_class_path(
        project_id, location="global", custom_class=custom_class_id
    )

    try:
        client.delete_custom_class(name=name)
        print(f"Successfully deleted custom class: {name}")
    except exceptions.NotFound:
        print(
            f"Custom class '{name}' not found. "
            "It may have already been deleted or the name is incorrect. "
            "Please ensure the custom class exists and the ID is correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(f"Failed to delete custom class '{name}'.")


# [END speech_v1_adaptation_customclass_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a custom class for Speech-to-Text adaptation."
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
        help="The ID of the custom class to delete.",
    )

    args = parser.parse_args()

    delete_custom_class(args.project_id, args.custom_class_id)
