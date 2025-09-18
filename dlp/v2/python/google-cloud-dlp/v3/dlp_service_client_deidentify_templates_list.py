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

# [START dlp_v2_dlpservice_deidentifytemplates_list]
from google.api_core.exceptions import GoogleAPIError
from google.cloud import dlp_v2


def list_deidentify_templates(project_id: str, location: str) -> None:
    """
    Lists de-identify templates within a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location (region) of the templates.
                  Can be "global" or a specific region like "us-central1".
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = dlp_v2.ListDeidentifyTemplatesRequest(parent=parent)

        page_result = client.list_deidentify_templates(request=request)

        print(f"De-identify templates found in {parent}:")
        templates_found = False
        for template in page_result:
            templates_found = True
            print(f"  Name: {template.name}")
            print(f"  Display Name: {template.display_name}")
            print("--------------------")

        if not templates_found:
            print("  No de-identify templates found.")

    except GoogleAPIError as e:
        print(f"Error listing de-identify templates: {e}")
        if "InvalidArgument" in str(e):
            print(
                "Please check if the project ID and location are valid and correctly formatted."
            )
            print(
                "Location should be 'global' or a valid region (e.g., 'us-central1')."
            )
        elif "NotFound" in str(e):
            print(
                "The specified project, organization, or location might not exist, or the DLP API is not enabled."
            )
        else:
            print("An unexpected API error occurred. Please check the error details.")


# [END dlp_v2_dlpservice_deidentifytemplates_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists de-identify templates in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location (region) of the templates (e.g., 'global' or 'us-central1').",
    )
    args = parser.parse_args()

    list_deidentify_templates(args.project_id, args.location)
