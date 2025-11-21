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

# [START dataplex_v1_dataplexservice_job_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1

def get_dataplex_job(
    project_id: str,
    location: str,
    lake_id: str,
    task_id: str,
    job_id: str,
) -> None:
    """
    Retrieves a Dataplex job resource.

    This function demonstrates how to fetch details of a specific Dataplex job
    using its resource name. It includes error handling for common API issues
    like the job not being found or permission errors.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake is located (e.g., 'us-central1').
        lake_id: The ID of the lake that contains the task.
        task_id: The ID of the task that owns the job.
        job_id: The ID of the job to retrieve.
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # Construct the full resource name for the job.
    # The format is: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}
    job_name = client.job_path(project_id, location, lake_id, task_id, job_id)

    try:
        # Initialize the request object with the job's resource name.
        request = dataplex_v1.GetJobRequest(name=job_name)

        # Act: Make the API request to get the job.
        job = client.get_job(request=request)

        # Assert: Print the retrieved job's details to standard output.
        print(f"Successfully retrieved job: {job.name}")
        print(f"  State: {job.state.name}")
        print(f"  Start Time: {job.start_time.isoformat()}")
        if job.end_time:
            print(f"  End Time: {job.end_time.isoformat()}")
        print(f"  Retry Count: {job.retry_count}")
        print(f"  Service: {job.service.name}")
        print(f"  Service Job ID: {job.service_job}")
        print(f"  Message: {job.message}")

    except exceptions.NotFound:
        # Handle cases where the specified job does not exist.
        print(f"Error: Job '{job_name}' not found. Please check the provided IDs and location.")
    except exceptions.PermissionDenied:
        # Handle cases where the authenticated principal lacks necessary permissions.
        print(f"Error: Permission denied to access job '{job_name}'.")
        print("Please ensure the service account or user has the 'dataplex.jobs.get' permission.")
    except exceptions.GoogleAPICallError as e:
        # Catch any other API-related errors.
        print(f"An API error occurred while retrieving job '{job_name}': {e}")
        print("Please review the error details and API documentation for corrective actions.")

# [END dataplex_v1_dataplexservice_job_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Dataplex job resource."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-llm-apis", # Example: 'cloud-llm-apis'
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1", # Example: 'us-central1'
        help="The Google Cloud region where the lake is located.",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-sample-lake", # Example: 'my-sample-lake'
        help="The ID of the lake.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-sample-task", # Example: 'my-sample-task'
        help="The ID of the task associated with the job.",
    )
    parser.add_argument(
        "--job_id",
        type=str,
        default="my-sample-job", # Example: 'my-sample-job'
        help="The ID of the job to retrieve.",
    )

    args = parser.parse_args()

    get_dataplex_job(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        task_id=args.task_id,
        job_id=args.job_id,
    )
