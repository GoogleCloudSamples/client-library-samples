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

# [START speech_v1p1beta1_adaptation_customclasses_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v1p1beta1


def list_custom_classes_sample(project_id: str) -> None:
    """Lists custom classes in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
    """
    try:
        client = speech_v1p1beta1.AdaptationClient()

        # The parent resource where this custom class will be created.
        parent = client.common_location_path(project_id, location="global")

        print(f"Listing custom classes in parent: {parent}")

        page_result = client.list_custom_classes(parent=parent)

        found_classes = False
        for custom_class in page_result:
            print(f"Found custom class: {custom_class.name}")
            found_classes = True

        if not found_classes:
            print(f"No custom classes found in {parent}.")

    except NotFound as e:
        print(
            f"Error: The specified project or location was not found: {e}"
        )
        print(
            "Please ensure the project ID and location are correct and accessible."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check your network connection and API permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_customclasses_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists custom classes in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()

    list_custom_classes_sample(args.project_id)
