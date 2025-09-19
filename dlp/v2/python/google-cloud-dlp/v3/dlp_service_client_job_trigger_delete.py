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

# [START dlp_v2_dlpservice_jobtrigger_delete]
from google.api_core import exceptions
from google.cloud import dlp_v2


def delete_job_trigger(
    project_id: str,
    location: str,
    job_trigger_id: str,
) -> None:
    """
    Deletes a DLP job trigger.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').
        job_trigger_id: The ID of the job trigger to delete.
    """

    client = dlp_v2.DlpServiceClient()
    name = f"projects/{project_id}/locations/{location}/jobTriggers/{job_trigger_id}"

    try:
        client.delete_job_trigger(name=name)
        print(f"Successfully deleted job trigger: {name}")
    except exceptions.NotFound:
        print(f"Job trigger '{name}' not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(f"Details: {e.details}")
        print(
            f"Verify the project ID and trigger ID are correct and you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_jobtrigger_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a DLP job trigger.")
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID to use.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--job_trigger_id",
        required=True,
        type=str,
        help="The ID of the job trigger to delete.",
    )
    args = parser.parse_args()

    delete_job_trigger(
        args.project_id,
        args.location,
        args.job_trigger_id,
    )
