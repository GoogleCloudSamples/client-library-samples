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

# [START dlp_v2_dlpservice_jobtriggers_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dlp_v2


def list_dlp_job_triggers(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all job triggers in a given project and location.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The geographic location (region) of the job triggers.
            Can be "global" or a specific region like "us-central1".
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_job_triggers(parent=parent)

        print(f"Job triggers found in {parent}:")
        found_triggers = False
        for trigger in response:
            found_triggers = True
            print(f"  Name: {trigger.name}")
            print(f"  Display Name: {trigger.display_name}")
            print(f"  Status: {trigger.status.name}")
            print("----------------------------------------")

        if not found_triggers:
            print("No job triggers found.")

    except GoogleAPICallError as e:
        print(f"Error listing job triggers: {e}")
        print(
            "Please ensure the project ID and location are correct and that "
            "the service account has the necessary permissions (DLP Administrator or DLP User)."
        )


# [END dlp_v2_dlpservice_jobtriggers_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists DLP job triggers in a project and location."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location (region) of the job triggers. Can be 'global' or a specific region like 'us-central1'.",
    )
    args = parser.parse_args()

    list_dlp_job_triggers(
        args.project_id,
        args.location,
    )
