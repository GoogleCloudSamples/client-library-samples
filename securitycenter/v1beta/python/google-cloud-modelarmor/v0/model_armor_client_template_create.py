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

# [START securitycenter_v1beta_modelarmor_template_create]
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import modelarmor_v1beta as modelarmor


def create_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Creates a new Model Armor template in a given project and location.

    This sample demonstrates how to create a basic template with a Responsible AI
    (RAI) filter for 'SEXUALLY_EXPLICIT' content.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'us-central1').
        template_id: The ID to assign to the new template. This must be unique
                     within the project and location and contain only lowercase
                     letters, numbers, and hyphens, and start with a letter.
    """
    # Create the client, pointing to the location's API endpoint
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )

    parent = client.common_location_path(project=project_id, location=location)

    # Configure a simple Responsible AI (RAI) filter for the template.
    # This example enables the 'SEXUALLY_EXPLICIT' filter.
    rai_filter = modelarmor.types.RaiFilterSettings.RaiFilter(
        filter_type=modelarmor.types.RaiFilterType.SEXUALLY_EXPLICIT
    )
    rai_settings = modelarmor.types.RaiFilterSettings(rai_filters=[rai_filter])
    filter_config = modelarmor.types.FilterConfig(rai_settings=rai_settings)

    template = modelarmor.types.Template(
        filter_config=filter_config,
    )

    try:
        request = modelarmor.types.CreateTemplateRequest(
            parent=parent,
            template_id=template_id,
            template=template,
        )

        response = client.create_template(request=request)

        print(f"Successfully created template: {response.name}")
        print(f"Created at: {response.create_time.isoformat()}")

    except AlreadyExists as e:
        print(
            f"Error: Template '{template_id}' already exists in '{parent}'. "
            f"Please choose a different template ID or use update_template. Details: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1beta_modelarmor_template_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Model Armor template.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID to assign to the new template.",
    )

    args = parser.parse_args()

    create_template(args.project_id, args.location, args.template_id)
