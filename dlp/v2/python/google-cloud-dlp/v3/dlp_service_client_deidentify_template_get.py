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

# [START dlp_v2_dlpservice_deidentifytemplate_get]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def get_deidentify_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """Gets a DeidentifyTemplate.

    Args:
        template_id: The ID of the de-identify template to retrieve.
        project_id: The Google Cloud project ID.
        location: The geographic location of the template (e.g., 'global', 'us-central1').
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/deidentifyTemplates/{template_id}"

    try:
        template = client.get_deidentify_template(name=name)

        print(f"Successfully retrieved de-identify template: {template.name}")
        print(f"Display Name: {template.display_name}")
        print(f"Description: {template.description}")
        print(f"Create Time: {template.create_time}")
        print(f"Update Time: {template.update_time}")

        if template.deidentify_config:
            print("Deidentify Configuration:")
            if template.deidentify_config.info_type_transformations:
                print("  Info Type Transformations configured.")
            if template.deidentify_config.record_transformations:
                print("  Record Transformations configured.")

    except NotFound:
        print(f"Error: De-identify template '{name}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_deidentifytemplate_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a DLP de-identify template."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID. ",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the template (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the de-identify template to retrieve.",
    )

    args = parser.parse_args()

    get_deidentify_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
