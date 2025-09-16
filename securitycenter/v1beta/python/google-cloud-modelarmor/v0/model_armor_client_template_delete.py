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

# [START securitycenter_v1beta_modelarmor_template_delete]
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import modelarmor_v1beta as modelarmor


def delete_template(project_id: str, location: str, template_id: str) -> None:
    """Deletes a Model Armor template.

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
        client.delete_template(name=template_name)
        print(f"Successfully deleted template: {template_name}")
    except NotFound:
        print(f"Template '{template_name}' not found.")
    except GoogleAPICallError as e:
        print(f"Error deleting template '{template_name}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1beta_modelarmor_template_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Model Armor template.")
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The location of the template (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        help="The ID of the template to delete.",
    )
    args = parser.parse_args()

    delete_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
