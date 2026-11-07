# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START dlp_v2_dlpservice_deidentifytemplate_create]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def create_deidentify_template(project_id: str) -> None:
    """Creates a de-identify template for masking sensitive data.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}"

    primitive_transformation = dlp_v2.PrimitiveTransformation(
        character_mask_config=dlp_v2.CharacterMaskConfig(
            masking_character="*",
            number_to_mask=4,
            reverse_order=True,
        )
    )
    info_type_transformation = (
        dlp_v2.InfoTypeTransformations.InfoTypeTransformation(
            info_types=[dlp_v2.InfoType(name="PHONE_NUMBER")],
            primitive_transformation=primitive_transformation,
        )
    )
    deidentify_config = dlp_v2.DeidentifyConfig(
        info_type_transformations=dlp_v2.InfoTypeTransformations(
            transformations=[info_type_transformation]
        )
    )
    deidentify_template = dlp_v2.DeidentifyTemplate(
        display_name="Example Phone Masking Template",
        description="Masks the last 4 characters of phone numbers",
        deidentify_config=deidentify_config,
    )

    try:
        response = client.create_deidentify_template(
            parent=parent,
            deidentify_template=deidentify_template,
        )
        print(f"Created template: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating de-identify template: {error}")
# [END dlp_v2_dlpservice_deidentifytemplate_create]
