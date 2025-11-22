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

# [START dlp_v2_dlpservice_infotypes_list]
from google.cloud import dlp_v2
from google.api_core.exceptions import GoogleAPICallError


def list_dlp_info_types(project_id: str, location: str = "global") -> None:
    """
    Lists all supported InfoTypes in Google Cloud DLP.

    This function demonstrates how to retrieve a comprehensive list of
    sensitive information types (InfoTypes) that Google Cloud DLP can detect.
    InfoTypes are predefined categories of sensitive data, such as email
    addresses, credit card numbers, or social security numbers. Understanding
    available InfoTypes is crucial for configuring effective data inspection
    and de-identification policies.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location to list InfoTypes for (e.g., "global", "us-central1").
                  Some InfoTypes are location-specific.
    """
    client = dlp_v2.DlpServiceClient()
    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_info_types(parent=parent)
        print("-" * 30)
        for info_type in response.info_types:
            print(f"Name: {info_type.display_name} ({info_type.name})")
            print(f"  Description: {info_type.description}")
            print(f"  Supported by: {[s.name for s in info_type.supported_by]}")
            if info_type.sensitivity_score:
                print(f"  Sensitivity Score: {info_type.sensitivity_score.score.name}")
            print("\n")

    except GoogleAPICallError as e:
        print(f"Error listing InfoTypes: {e}")
        print(
            "Please ensure the project ID and location are correct and you have the necessary permissions."
        )


# [END dlp_v2_dlpservice_infotypes_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all supported InfoTypes in Google Cloud DLP."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "location",
        default="global",
        help="The geographic location to list InfoTypes for (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()

    list_dlp_info_types(project_id=args.project_id, location=args.location)
