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

from google.api_core import exceptions

# [START dataplex_v1_dataplexservice_jobs_list]
from google.cloud import dataplex_v1

def list_jobs(
    project_id: str,
    location: str,
    lake_id: str,
    task_id: str,
) -> None:
    """
    Lists jobs under a given Dataplex task.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake and task are located (e.g., 'us-central1').
        lake_id: The ID of the lake.
        task_id: The ID of the task.
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # The resource name of the parent task.
    # Example: projects/your-project-id/locations/us-central1/lakes/my-lake/tasks/my-task
    parent = f"projects/{project_id}/locations/{location}/lakes/{lake_id}/tasks/{task_id}"

    try:
        # Construct the request
        request = dataplex_v1.ListJobsRequest(parent=parent)

        # Make the request and iterate through the paged response
        print(f"Listing jobs for task: {parent}")
        for job in client.list_jobs(request=request):
            print(f"- Job Name: {job.name}")
            print(f"  State: {job.state.name}")
            print(f"  Start Time: {job.start_time.isoformat()}")
            if job.end_time.year > 1: # Check if end_time is set (not default/empty)
                print(f"  End Time: {job.end_time.isoformat()}")
            print(f"  Message: {job.message}")

    except exceptions.NotFound:
        print(f"Error: The specified task {parent} was not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END dataplex_v1_dataplexservice_jobs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists jobs under a given Dataplex task."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="your-project-id",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-lake",
        help="The ID of the Dataplex lake.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-task",
        help="The ID of the Dataplex task.",
    )
    args = parser.parse_args()

    list_jobs(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        task_id=args.task_id,
    )
