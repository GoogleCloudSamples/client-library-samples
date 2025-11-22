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

# [START securitycenter_v1_modelarmor_template_delete]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import modelarmor_v1 as modelarmor


def delete_template(project_id: str, location: str, template_id: str) -> None:
    """Deletes a Model Armor template.

    This function demonstrates how to delete a Model Armor template by its ID.
    It constructs the full resource name and handles cases where the template
    might not be found.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the template (e.g., "us-central1").
        template_id: The ID of the template to delete.
    """

    # Create the client, pointing to the location's API endpoint
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )

    template_name = client.template_path(
        project=project_id, location=location, template=template_id
    )

    try:
        print(f"Attempting to delete template: {template_name}")
        client.delete_template(name=template_name)
        print(f"Successfully deleted template: {template_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Template {template_name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"An error occurred while deleting template {template_name}: {e}")


# [END securitycenter_v1_modelarmor_template_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Model Armor template.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the template (e.g., 'us-central1')",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID of the template to delete.",
    )
    args = parser.parse_args()

    delete_template(args.project_id, args.location, args.template_id)
