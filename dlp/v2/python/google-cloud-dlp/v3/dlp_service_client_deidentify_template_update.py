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

# [START dlp_v2_dlpservice_deidentifytemplate_update]
import google.cloud.dlp_v2 as dlp_v2
from google.api_core.exceptions import NotFound
from google.protobuf import field_mask_pb2


def update_deidentify_template(
    project_id: str,
    location: str,
    template_id: str,
    new_display_name: str = "My new display name",
    new_description: str = "My new description",
) -> None:
    """Updates an existing de-identification template.

    The de-identification template allows you to save configurations for
    de-identifying sensitive data. This sample updates the display name
    and description of an existing template.

    Args:
        project_id: The Google Cloud project ID to use for the API call.
        template_id: The ID of the de-identification template to update.
            This is the last part of the template's resource name.
        new_display_name: The new display name for the template.
        new_description: The new description for the template.
        location: (Optional) The location of the template (e.g., 'global', 'us-central1').
    """

    client = dlp_v2.DlpServiceClient()

    template_name = (
        f"projects/{project_id}/locations/{location}/deidentifyTemplates/{template_id}"
    )

    updated_template = dlp_v2.DeidentifyTemplate(
        display_name=new_display_name,
        description=new_description,
        # In this example, the config is changed to deidentify email addresses.
        deidentify_config=dlp_v2.DeidentifyConfig(
            info_type_transformations=dlp_v2.InfoTypeTransformations(
                transformations=[
                    dlp_v2.InfoTypeTransformations.InfoTypeTransformation(
                        info_types=[{"name": "EMAIL_ADDRESS"}],
                        primitive_transformation=dlp_v2.PrimitiveTransformation(
                            replace_with_info_type_config={}
                        ),
                    )
                ]
            )
        ),
    )

    # Create a FieldMask to specify which fields to update.
    update_mask = field_mask_pb2.FieldMask(
        paths=["display_name", "description", "deidentify_config"]
    )

    try:
        response = client.update_deidentify_template(
            name=template_name,
            deidentify_template=updated_template,
            update_mask=update_mask,
        )
        print(f"Successfully updated de-identification template: {response.name}")
        print(f"New display name: {response.display_name}")
        print(f"New description: {response.description}")
        print(f"New config: {response.deidentify_config}")
    except NotFound:
        print(f"Error: De-identification template '{template_name}' not found.")
        print("Please ensure the template_id and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_deidentifytemplate_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing de-identification template."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID. Required if organization_id is not provided.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--location",
        help="The location of the template (e.g., 'global', 'us-central1').",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the de-identification template to update.",
    )
    parser.add_argument(
        "--new_display_name",
        default="My new display name",
        type=str,
        help="The new display name for the template.",
    )
    parser.add_argument(
        "--new_description",
        default="My new description",
        type=str,
        help="The new description for the template.",
    )

    args = parser.parse_args()

    update_deidentify_template(
        project_id=args.project_id,
        template_id=args.template_id,
        new_display_name=args.new_display_name,
        new_description=args.new_description,
        location=args.location,
    )
