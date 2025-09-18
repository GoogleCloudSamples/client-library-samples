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

# [START dlp_v2_dlpservice_inspecttemplate_create]
from google.cloud import dlp_v2
from google.api_core.exceptions import AlreadyExists


def create_inspect_template(
    project_id: str,
    location: str,
) -> None:
    """Creates an InspectTemplate for reusing frequently used configuration for
    inspecting content, images, and storage.

    The template's ID is automatically generated.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to create the template in.
            (e.g., 'global', 'us-central1').
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    # For example, to detect phone numbers and email addresses
    inspect_config = dlp_v2.InspectConfig(
        info_types=[
            {"name": "PHONE_NUMBER"},
            {"name": "EMAIL_ADDRESS"},
        ],
        min_likelihood=dlp_v2.Likelihood.POSSIBLE,
        include_quote=True,
    )

    inspect_template = dlp_v2.InspectTemplate(
        inspect_config=inspect_config,
    )

    try:
        response = client.create_inspect_template(
            parent=parent,
            inspect_template=inspect_template,
        )
        print(f"Successfully created inspect template: {response.name}")
    except Exception as e:
        print(f"Error creating inspect template: {e}")


# [END dlp_v2_dlpservice_inspecttemplate_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a DLP Inspect Template.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to create the template in. (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()

    create_inspect_template(
        args.project_id,
        args.location,
    )
