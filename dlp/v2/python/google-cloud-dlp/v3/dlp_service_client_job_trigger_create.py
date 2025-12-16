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

# [START dlp_v2_dlpservice_jobtrigger_create]
from google.api_core.exceptions import GoogleAPICallError, PermissionDenied
from google.cloud import dlp_v2


def create_dlp_job_trigger(
    project_id: str, location: str, job_trigger_id: str, gcs_path: str
) -> None:
    """
    Creates a new job trigger to scan a Cloud Storage bucket for sensitive data.

    This sample demonstrates how to create a scheduled job trigger that
    automatically inspects a specified Cloud Storage bucket for sensitive
    information (e.g., email addresses and phone numbers) on a daily basis.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').
        job_trigger_id: The ID of the job trigger to retrieve.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    storage_config = dlp_v2.types.StorageConfig(
        cloud_storage_options=dlp_v2.types.CloudStorageOptions(
            file_set=dlp_v2.types.CloudStorageOptions.FileSet(url=gcs_path)
        )
    )

    # Configure what infoTypes to look for.
    # For a full list of infoTypes, see:
    # https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference
    inspect_config = dlp_v2.types.InspectConfig(
        info_types=[
            {"name": "EMAIL_ADDRESS"},
            {"name": "PHONE_NUMBER"},
        ],
        min_likelihood=dlp_v2.types.Likelihood.POSSIBLE,
    )

    # Configure the inspect job.
    # This job will be run by the trigger.
    inspect_job_config = dlp_v2.types.InspectJobConfig(
        storage_config=storage_config,
        inspect_config=inspect_config,
        # Optional: Add actions to perform when findings are detected.
        # For example, to save findings to BigQuery:
        # actions=[
        #     dlp_v2.types.Action(
        #         save_findings=dlp_v2.types.Action.SaveFindings(
        #             output_config=dlp_v2.types.OutputStorageConfig(
        #                 table=dlp_v2.types.BigQueryTable(
        #                     project_id=project_id,
        #                     dataset_id="your-dataset-id",
        #                     table_id="your-table-id",
        #                 )
        #             )
        #         )
        #     )
        # ]
    )

    # Configure the schedule for the job trigger.
    # This example sets a daily schedule.
    schedule = dlp_v2.types.Schedule(
        recurrence_period_duration={"seconds": 86400}  # Daily in seconds
    )

    # Create the JobTrigger object.
    # This example sets a display name and description.
    job_trigger = dlp_v2.types.JobTrigger(
        display_name="My Sample Job Trigger",
        description="Daily scan of a sample Cloud Storage bucket for PII.",
        inspect_job=inspect_job_config,
        triggers=[dlp_v2.types.JobTrigger.Trigger(schedule=schedule)],
        status=dlp_v2.types.JobTrigger.Status.HEALTHY,  # Set to HEALTHY to enable the trigger
    )

    # Construct the request.
    request = dlp_v2.types.CreateJobTriggerRequest(
        parent=parent,
        job_trigger=job_trigger,
        trigger_id=job_trigger_id,
    )

    try:
        response = client.create_job_trigger(request=request)

        print(f"Successfully created job trigger: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Description: {response.description}")
        print(f"Status: {dlp_v2.types.JobTrigger.Status(response.status).name}")

    except PermissionDenied as e:
        print(
            f"Permission denied to create job trigger. "
            f"Please ensure the service account has the necessary roles (e.g., DLP Administrator, Storage Object Viewer) "
            f"in project '{project_id}' and location '{location}'. Error: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END dlp_v2_dlpservice_jobtrigger_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a DLP job trigger to scan a Cloud Storage bucket."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--job_trigger_id",
        help="The ID of the job trigger to retrieve.",
    )
    parser.add_argument(
        "--gcs_path",
        required=True,
        type=str,
        help="The Google Cloud Storage path to inspect (e.g., 'gs://my-bucket/').",
    )
    args = parser.parse_args()

    create_dlp_job_trigger(
        args.project_id, args.location, args.job_trigger_id, args.gcs_path
    )
