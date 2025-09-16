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

# [START securitycenter_v1beta_modelarmor_templates_list]
from google.api_core.client_options import ClientOptions
from google.api_core import exceptions
from google.cloud import modelarmor_v1beta as modelarmor


def list_templates(project_id: str, location: str) -> None:
    """Lists templates in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us-central1").
    """
    # Create the client, pointing to the location's API endpoint
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )

    # The `parent` parameter defines the scope for listing templates.
    parent = client.common_location_path(project=project_id, location=location)

    try:
        request = modelarmor.ListTemplatesRequest(parent=parent)

        page_result = client.list_templates(request=request)

        print(f"Listing templates for parent: {parent}")
        found_templates = False
        for response in page_result:
            print(f"Template found: {response.name}")
            found_templates = True

        if not found_templates:
            print(f"No templates found in {parent}.")

    except exceptions.NotFound:
        print(
            f"Error: The specified project or location '{parent}' was not found. "
            "Please ensure the project ID and location are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END securitycenter_v1beta_modelarmor_templates_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists templates in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud location (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_templates(args.project_id, args.location)
