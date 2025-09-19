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

# [START dlp_v2_dlpservice_dlpjob_delete]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def delete_dlp_job(
    project_id: str,
    location: str,
    job_id: str,
) -> None:
    """
    Deletes a specified DLP job.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The geographic location of the DLP job (e.g., 'global', 'us-central1').
                  If the job is global, use 'global'.
        job_id: The ID of the DLP job to delete.
    """

    client = dlp_v2.DlpServiceClient()

    job_name = f"projects/{project_id}/locations/{location}/dlpJobs/{job_id}"

    try:
        client.delete_dlp_job(name=job_name)
        print(f"Successfully deleted DLP job: {job_name}")
    except NotFound:
        print(
            f"DLP job '{job_name}' not found. It may have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An error occurred: {e}")


# [END dlp_v2_dlpservice_dlpjob_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a specified DLP job.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )

    parser.add_argument(
        "--location",
        help="The geographic location of the DLP job (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--job_id",
        required=True,
        type=str,
        help="The ID of the DLP job to delete (e.g., `i-1234567890`).",
    )
    args = parser.parse_args()

    delete_dlp_job(
        args.project_id,
        args.location,
        args.job_id,
    )
