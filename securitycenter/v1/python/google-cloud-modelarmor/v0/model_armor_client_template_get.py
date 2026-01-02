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

# [START securitycenter_v1_modelarmor_template_get]
from google.api_core.client_options import ClientOptions
from google.api_core import exceptions
from google.cloud import modelarmor_v1 as modelarmor


def get_model_armor_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Retrieves details of a specific Model Armor template.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the template is located (e.g., "us-central1").
        template_id: The ID of the Model Armor template to retrieve.
    """

    # Create the client, pointing to the location's API endpoint
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )

    template_name = client.template_path(
        project=project_id,
        location=location,
        template=template_id,
    )

    try:
        template = client.get_template(name=template_name)
        print(f"Successfully retrieved template: {template.name}")
        print(f"Create time: {template.create_time.isoformat()}")
        print(f"Update time: {template.update_time.isoformat()}")
        print(f"Filter config: {template.filter_config}")
    except exceptions.NotFound:
        print(f"Error: Template '{template_name}' not found.")
        print(
            "Please ensure the project ID, location, and template ID are correct and the template exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1_modelarmor_template_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve details of a Model Armor template."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The region where the template is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the Model Armor template to retrieve.",
    )

    args = parser.parse_args()

    get_model_armor_template(args.project_id, args.location, args.template_id)
