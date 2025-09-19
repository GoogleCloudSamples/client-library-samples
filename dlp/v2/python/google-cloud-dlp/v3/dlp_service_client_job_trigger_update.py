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

# [START dlp_v2_dlpservice_jobtrigger_update]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2
from google.protobuf import field_mask_pb2


def update_dlp_job_trigger(
    project_id: str,
    location: str,
    job_trigger_id: str,
    new_display_name: str = "My new display name for job trigger",
) -> None:
    """Updates an existing DLP job trigger.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').
        job_trigger_id: The ID of the job trigger to update (e.g., 'my-job-trigger-123').
        new_display_name: The new display name for the job trigger.
    """

    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/jobTriggers/{job_trigger_id}"

    # Create a JobTrigger object with the fields to update.
    # For this example, we'll update the display name and set the status to PAUSED.
    # Other fields like inspect_job or triggers can also be updated.
    updated_job_trigger = dlp_v2.JobTrigger(
        display_name=new_display_name,
        status=dlp_v2.JobTrigger.Status.PAUSED,
    )

    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "status"])

    try:
        response = client.update_job_trigger(
            name=name,
            job_trigger=updated_job_trigger,
            update_mask=update_mask,
        )

        print(f"Successfully updated job trigger: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"New Status: {response.status.name}")
        print(f"Last run time: {response.last_run_time.isoformat()}")

    except NotFound:
        print(
            f"Error: Job trigger '{job_trigger_id}' not found in project '{project_id}'."
        )
        print("Please ensure the job trigger ID and project ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_jobtrigger_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates an existing DLP job trigger.")
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID to which the job trigger belongs.",
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
        help="The ID of the job trigger to update.",
    )
    parser.add_argument(
        "--new_display_name",
        default="My new display name for job trigger",
        type=str,
        help="The new display name for the job trigger.",
    )
    args = parser.parse_args()

    update_dlp_job_trigger(
        args.project_id, args.location, args.job_trigger_id, args.new_display_name
    )
