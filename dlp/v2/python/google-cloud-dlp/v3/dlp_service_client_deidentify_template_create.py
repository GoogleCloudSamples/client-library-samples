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

# [START dlp_v2_dlpservice_deidentifytemplate_create]
from google.api_core import exceptions
from google.cloud import dlp_v2


def create_deidentify_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Creates a de-identification template.

    The de-identification template specifies how to transform sensitive data.
    This sample creates a template that replaces phone numbers with their info type.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The Google Cloud region to create the template in (e.g., "global", "us-central1").
        template_id: The ID to use for the de-identification template. This ID must be unique
                     within the specified project and location.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    # This example replaces PHONE_NUMBER findings with their info type name.
    deidentify_config = dlp_v2.DeidentifyConfig(
        info_type_transformations=dlp_v2.InfoTypeTransformations(
            transformations=[
                dlp_v2.InfoTypeTransformations.InfoTypeTransformation(
                    info_types=[dlp_v2.InfoType(name="PHONE_NUMBER")],
                    primitive_transformation=dlp_v2.PrimitiveTransformation(
                        replace_with_info_type_config={}
                    ),
                )
            ]
        )
    )

    deidentify_template = dlp_v2.DeidentifyTemplate(
        deidentify_config=deidentify_config,
    )

    try:
        response = client.create_deidentify_template(
            parent=parent,
            deidentify_template=deidentify_template,
        )
        print(f"Successfully created de-identification template: {response.name}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: De-identification template '{template_id}' already exists in {parent}. {e}"
        )
        print("Please choose a different template ID or delete the existing one.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_deidentifytemplate_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a de-identification template in Google Cloud DLP."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region to create the template in.",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID to use for the de-identification template.",
    )

    args = parser.parse_args()

    create_deidentify_template(args.project_id, args.location, args.template_id)
