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

# [START securitycenter_v1beta_modelarmor_template_update]
from google.api_core.client_options import ClientOptions
from google.api_core import exceptions
from google.cloud import modelarmor_v1beta as modelarmor
from google.protobuf import field_mask_pb2


def update_template(
    project_id: str,
    location: str,
    template_id: str,
    new_enforcement_type: str,
) -> None:
    """
    Updates an existing Model Armor template with a enforcement type.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The location of the template (e.g., 'us-central1').
        template_id: The ID of the template to update.
        new_enforcement_type: The new enforcement type for the template's metadata.
                              Must be 'INSPECT_ONLY' or 'INSPECT_AND_BLOCK'.
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

    # Convert the string enforcement type to its corresponding enum value.
    try:
        enforcement_type_enum = (
            modelarmor.types.Template.TemplateMetadata.EnforcementType[
                new_enforcement_type
            ]
        )
    except KeyError:
        print(
            f"Error: Invalid enforcement type '{new_enforcement_type}'. "
            "Valid options are 'INSPECT_ONLY' and 'INSPECT_AND_BLOCK'."
        )
        return

    # Create a Template object with the fields to be updated.
    # Only fields specified in the update_mask will be modified.
    # For nested messages, you need to provide the full nested structure.
    updated_template = modelarmor.types.Template(
        name=template_name,
        template_metadata=modelarmor.types.Template.TemplateMetadata(
            enforcement_type=enforcement_type_enum
        ),
    )

    # Create a FieldMask to specify which fields of the template are being updated.
    # Paths should correspond to the field names in the Template message.
    update_mask = field_mask_pb2.FieldMask(paths=["template_metadata.enforcement_type"])

    request = modelarmor.types.UpdateTemplateRequest(
        template=updated_template,
        update_mask=update_mask,
    )

    try:
        response = client.update_template(request=request)

        print(f"Template '{response.name}' updated successfully.")
        print(
            f"New enforcement type: {response.template_metadata.enforcement_type.name}"
        )

    except exceptions.NotFound as e:
        print(
            f"Error: Template '{template_name}' not found. Please ensure the template exists."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please check your project ID, location, and template ID.")


# [END securitycenter_v1beta_modelarmor_template_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update an existing Model Armor template."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The location of the template (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the template to update.",
    )
    parser.add_argument(
        "--new_enforcement_type",
        type=str,
        default="INSPECT_ONLY",
        choices=["INSPECT_ONLY", "INSPECT_AND_BLOCK"],
        help="The new enforcement type for the template's metadata (INSPECT_ONLY or INSPECT_AND_BLOCK).",
    )

    args = parser.parse_args()

    update_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
        new_enforcement_type=args.new_enforcement_type,
    )
