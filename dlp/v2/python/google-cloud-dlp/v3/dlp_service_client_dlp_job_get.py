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

# [START dlp_v2_dlpservice_dlpjob_get]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def get_dlp_job(
    project_id: str,
    job_id: str,
    location: str,
) -> None:
    """Retrieves the latest state of a long-running DLP job.

    Args:
        project_id: The Google Cloud project ID.
        job_id: The ID of the DLP job to retrieve.
        location: The geographic location of the DLP job (e.g., 'global', 'us-central1').
                  If the job is global, use 'global'.
    """
    client = dlp_v2.DlpServiceClient()

    job_name = f"projects/{project_id}/locations/{location}/dlpJobs/{job_id}"

    try:
        job = client.get_dlp_job(name=job_name)

        print(f"DLP job: {job.name}")
        print(f"Job Type: {job.type.name}")
        print(f"Job State: {job.state.name}")
        print(f"Create Time: {job.create_time.isoformat()}")
        if job.end_time:
            print(f"End Time: {job.end_time.isoformat()}")

    except NotFound:
        print(
            f"Error: DLP job '{job_name}' not found. Please ensure the job ID and location are correct."
        )
        print(
            "Corrective action: Verify the job ID and location in the Google Cloud Console or with `gcloud dlp jobs list`."
        )
    except Exception as e:
        print(
            f"An unexpected error occurred: {e}. Please check the logs for more details."
        )


# [END dlp_v2_dlpservice_dlpjob_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the latest state of a long-running DLP job."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--job_id", required=True, type=str, help="The ID of the DLP job to retrieve."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the DLP job (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()

    get_dlp_job(
        args.project_id,
        args.job_id,
        args.location,
    )
