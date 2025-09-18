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

# [START dlp_v2_dlpservice_deidentifytemplate_delete]
import google.api_core.exceptions
from google.cloud import dlp_v2


def delete_deidentify_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """Deletes a de-identify template.

    Args:
        template_id: The ID of the de-identify template to retrieve.
        project_id: The Google Cloud project ID.
        location: The geographic location of the template (e.g., 'global', 'us-central1').
    """
    client = dlp_v2.DlpServiceClient()

    template_name = (
        f"projects/{project_id}/locations/{location}/deidentifyTemplates/{template_id}"
    )

    try:
        client.delete_deidentify_template(name=template_name)
        print(f"De-identify template '{template_name}' deleted successfully.")

    except google.api_core.exceptions.NotFound:
        print(f"De-identify template '{template_name}' not found.")
        print("Please ensure the template ID and organization ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_deidentifytemplate_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a de-identify template.")

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
        help="The geographic location of the template (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID of the de-identify template to delete. ",
    )
    args = parser.parse_args()

    delete_deidentify_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
