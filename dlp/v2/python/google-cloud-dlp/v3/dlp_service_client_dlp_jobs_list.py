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

# [START dlp_v2_dlpservice_dlpjobs_list]
from google.api_core.exceptions import GoogleAPICallError, InvalidArgument
from google.cloud import dlp_v2


def list_dlp_jobs(
    project_id: str,
    location: str,
) -> None:
    """
    Lists DLP jobs for a given project and location.

    The `list_dlp_jobs` method allows you to retrieve a list of
    previously created DLP inspection or risk analysis jobs.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the jobs (e.g., 'global', 'us-central1').
                  DLP jobs can be created in a specific region or globally.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        response_iterator = client.list_dlp_jobs(parent=parent)

        print(f"DLP Jobs in {parent}:")
        found_jobs = False
        for job in response_iterator:
            found_jobs = True
            print(f"  Job Name: {job.name}")
            print(f"  Job Type: {job.type.name}")
            print(f"  Job State: {job.state.name}")
            print("\n")

        if not found_jobs:
            print("No DLP jobs found matching the criteria.")

    except InvalidArgument as e:
        print(f"Error listing DLP jobs: {e.message}")
        print("Please ensure the project ID is correct and the location is valid.")
        print("Common locations are 'global' or 'us-central1'.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_dlpjobs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists DLP jobs for a given project and location."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the jobs (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()

    list_dlp_jobs(args.project_id, args.location)
