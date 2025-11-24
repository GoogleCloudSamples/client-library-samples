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

# [START speech_v2_speech_customclasses_list]
from google.api_core import exceptions
from google.cloud import speech_v2


def list_custom_classes(project_id: str) -> None:
    """
    Lists custom classes in a given project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech_v2.SpeechClient()

    parent = f"projects/{project_id}/locations/global"

    try:
        print(f"Listing custom classes in {parent}:")
        page_result = client.list_custom_classes(parent=parent)

        found_custom_classes = False
        for custom_class in page_result:
            found_custom_classes = True
            print(f"  Found custom class: {custom_class.name}")

        if not found_custom_classes:
            print(f"No custom classes found in {parent}.")

    except exceptions.NotFound:
        print(f"Error: The specified project '{project_id}' was not found.")
        print(
            "Please ensure the project ID is correct and that the Speech-to-Text API is enabled."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_customclasses_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists custom classes in a specified project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    list_custom_classes(args.project_id)
