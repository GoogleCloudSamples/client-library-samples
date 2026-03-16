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

# [START dlp_v2_dlpservice_inspecttemplate_update]
from google.cloud import dlp_v2
from google.api_core.exceptions import NotFound, GoogleAPICallError
from google.protobuf import field_mask_pb2


def update_inspect_template(
    project_id: str,
    location: str,
    template_id: str,
    new_display_name: str,
    new_description: str,
) -> None:
    """Updates an existing InspectTemplate.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The geographic location of the inspect template.
        template_id: The ID of the inspect template to update.
        new_display_name: The new display name for the template.
        new_description: The new description for the template.
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/inspectTemplates/{template_id}"

    inspect_template = dlp_v2.InspectTemplate(
        display_name=new_display_name, description=new_description
    )

    # Create a field mask to specify which fields to update
    # In this case, we are updating 'display_name' and 'description'
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    try:
        response = client.update_inspect_template(
            name=name, inspect_template=inspect_template, update_mask=update_mask
        )

        print(f"Successfully updated inspect template: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"New Description: {response.description}")

    except NotFound:
        print(
            f"Error: Inspect template '{template_id}' not found at '{name}'. "
            "Please ensure the template ID and parent resource (project/organization and location) are correct."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your input parameters and permissions.")


# [END dlp_v2_dlpservice_inspecttemplate_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing DLP Inspect Template."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--location",
        help="The geographic location of the inspect template (e.g., 'global', 'us', 'europe').",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--template_id",
        help="The ID of the inspect template to update.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--new_display_name",
        help="The new display name for the template.",
        default="Updated Inspect Template Display Name",
    )
    parser.add_argument(
        "--new_description",
        help="The new description for the template.",
        default="This is an updated description for the inspect template.",
    )

    args = parser.parse_args()

    update_inspect_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
        new_display_name=args.new_display_name,
        new_description=args.new_description,
    )
