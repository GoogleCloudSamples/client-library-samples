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

# [START dlp_v2_dlpservice_jobtrigger_get]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def get_dlp_job_trigger(project_id: str, location: str, job_trigger_id: str) -> None:
    """
    Gets a DLP job trigger.

    The `get_job_trigger` method retrieves the details of a specific job trigger
    identified by its ID. This is useful for checking the status, configuration,
    and history of a scheduled DLP scan.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to create the job trigger in (e.g., 'global', 'us-central1').
        job_trigger_id: The ID of the job trigger to retrieve.
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/jobTriggers/{job_trigger_id}"

    try:
        job_trigger = client.get_job_trigger(name=name)
        print(f"Job trigger: {job_trigger.name}")
        print(f"Display Name: {job_trigger.display_name}")
        print(f"Description: {job_trigger.description}")
        print(f"Status: {job_trigger.status.name}")
        print(f"Last Run Time: {job_trigger.last_run_time}")
        print(f"Create Time: {job_trigger.create_time}")
        print(f"Update Time: {job_trigger.update_time}")

        if job_trigger.inspect_job:
            print("Inspect Job Details:")
            if job_trigger.inspect_job.storage_config:
                if job_trigger.inspect_job.storage_config.cloud_storage_options:
                    print(
                        f"  Cloud Storage Path: {job_trigger.inspect_job.storage_config.cloud_storage_options.file_set.url}"
                    )
                elif job_trigger.inspect_job.storage_config.big_query_options:
                    print(
                        f"  BigQuery Table: {job_trigger.inspect_job.storage_config.big_query_options.table_reference.table_id}"
                    )

    except NotFound:
        print(
            f"Error: Job trigger '{job_trigger_id}' not found in project '{project_id}'."
        )
        print("Please ensure the job trigger ID is correct and exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_jobtrigger_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a DLP job trigger by its ID."
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
        required=True,
        type=str,
        help="The ID of the job trigger to retrieve.",
    )
    args = parser.parse_args()

    get_dlp_job_trigger(args.project_id, args.location, args.job_trigger_id)
