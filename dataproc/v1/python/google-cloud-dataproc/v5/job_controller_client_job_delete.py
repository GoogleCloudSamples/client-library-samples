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

# [START dataproc_v1_jobcontroller_delete_job]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_dataproc_job(
    project_id: str,
    location: str,
    job_id: str,
) -> None:
    """Deletes a Dataproc job.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region where the job is located (e.g., 'us-central1').
        job_id: The ID of the job to delete.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.JobControllerClient(client_options=options)

    request = dataproc_v1.DeleteJobRequest(
        project_id=project_id,
        region=location,
        job_id=job_id,
    )

    try:
        client.delete_job(request=request)
        print(
            f"Job {job_id} in project {project_id}, region {location} deleted successfully."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Failed to delete job {job_id} in project {project_id}, region {location}. "
            f"Error: {e.message}. "
            "Jobs must be in a terminal state (DONE, ERROR, or CANCELLED) to be deleted."
        )
    except exceptions.NotFound as e:
        print(
            f"Job {job_id} in project {project_id}, region {location} not found. "
            f"Error: {e.message}"
        )
    except Exception as e:
        print(
            f"An unexpected error occurred while deleting job {job_id} in project {project_id}, region {location}: {e}"
        )


# [END dataproc_v1_jobcontroller_delete_job]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataproc job.")
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Dataproc region where the job is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--job_id", type=str, help="The ID of the job to delete.", required=True
    )
    args = parser.parse_args()

    delete_dataproc_job(
        project_id=args.project_id,
        region=args.location,
        job_id=args.job_id,
    )
