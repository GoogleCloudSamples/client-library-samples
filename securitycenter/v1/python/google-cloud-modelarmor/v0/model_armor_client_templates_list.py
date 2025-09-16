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

# [START securitycenter_v1_modelarmor_templates_list]
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import GoogleAPIError
from google.cloud import modelarmor_v1 as modelarmor


def list_templates(
    project_id: str,
    location: str,
) -> None:
    """
    Lists ModelArmor templates in a given project and location.

    This function demonstrates how to retrieve a list of security templates
    configured within ModelArmor for a specific Google Cloud project and location.
    Templates define various security configurations and policies.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us-central1").
    """
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )

    parent = f"projects/{project_id}/locations/{location}"

    try:
        print(f"Listing templates for parent: {parent}")
        for template in client.list_templates(parent=parent):
            print(f"Template found: {template.name}")
            print(f"  Create Time: {template.create_time.isoformat()}")
            print(f"  Update Time: {template.update_time.isoformat()}")

    except GoogleAPIError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check your network connection, project ID, location, "
            "and permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please ensure your environment is correctly set up.")


# [END securitycenter_v1_modelarmor_templates_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists ModelArmor templates in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID. Example: 'your-project-id'",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud location (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_templates(args.project_id, args.location)
