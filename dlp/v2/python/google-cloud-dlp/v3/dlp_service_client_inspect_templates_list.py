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

# [START dlp_v2_dlpservice_inspecttemplates_list]
from google.api_core import exceptions
from google.cloud import dlp_v2


def list_inspect_templates(project_id: str, location: str) -> None:
    """Lists DLP inspect templates for a given project and location.

    Args:
        project_id: The Google Cloud project ID. (e.g., "your-project-id")
        location: The geographic location (region) to list templates from.
                  Can be 'global' or a specific region like 'us-central1'.
                  Defaults to 'global'.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_inspect_templates(parent=parent)

        print(f"Inspect templates found in {parent}:")
        found_templates = False
        for template in response:
            found_templates = True
            print(f"  Name: {template.name}")
            print(f"  Display Name: {template.display_name}")
            print(f"  Description: {template.description}")
            print(f"  Created: {template.create_time.isoformat()}")
            print(f"  Updated: {template.update_time.isoformat()}")
            print("---")

        if not found_templates:
            print(f"No inspect templates found in {parent}.")

    except exceptions.NotFound:
        print(
            f"Error: The parent resource '{parent}' was not found. "
            "Please ensure the project ID and location are correct and "
            "that the DLP API is enabled for the project."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_inspecttemplates_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists DLP inspect templates for a given project and location."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        help="The geographic location (region) to list templates from. "
        "Can be 'global' or a specific region like 'us-central1'. ",
        default="global",
    )
    args = parser.parse_args()

    list_inspect_templates(args.project_id, args.location)
