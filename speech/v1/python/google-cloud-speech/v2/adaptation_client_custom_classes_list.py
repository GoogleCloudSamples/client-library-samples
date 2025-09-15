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

# [START speech_v1_adaptation_customclasses_list]
from google.api_core import exceptions
from google.cloud import speech_v1


def list_custom_classes(
    project_id: str,
) -> None:
    """
    Lists custom classes in a given project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech_v1.AdaptationClient()

    parent = f"projects/{project_id}/locations/global"

    try:
        page_result = client.list_custom_classes(parent=parent)

        found_custom_classes = False
        for custom_class in page_result:
            found_custom_classes = True
            print(f"  Found Custom Class: {custom_class.name}")
            if custom_class.items:
                print("    Items:")
                for item in custom_class.items:
                    print(f"      - {item.value}")
            print("\n")

        if not found_custom_classes:
            print(f"No custom classes found for project {project_id}.")

    except exceptions.NotFound:
        print(
            f"Error: The specified parent location '{parent}' does not exist "
            "or contains no custom classes. Please check the project ID"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_customclasses_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists custom classes in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID. E.g., 'my-project-123'",
    )

    args = parser.parse_args()

    list_custom_classes(args.project_id)
