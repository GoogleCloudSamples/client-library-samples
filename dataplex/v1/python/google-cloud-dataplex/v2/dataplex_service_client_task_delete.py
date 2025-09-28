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

# [START dataplex_v1_dataplexservice_task_delete]
from google.cloud import dataplex_v1

def delete_task_sample(
    project_id: str,
    location_id: str,
    lake_id: str,
    task_id: str,
) -> None:
    """
    Deletes a Dataplex task.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the lake.
        task_id: The ID of the task to delete.
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # Construct the full resource name for the task
    task_name = client.task_path(project_id, location_id, lake_id, task_id)

    # Initialize request argument(s)
    request = dataplex_v1.DeleteTaskRequest(name=task_name)

    try:
        # Make the request
        operation = client.delete_task(request=request)

        print(f"Waiting for task deletion operation to complete for task: {task_name}...")

        # The delete operation does not return any resource, so .result() will return None.
        operation.result()

        print(f"Task {task_name} deleted successfully.")

    except exceptions.NotFound:
        print(f"Task {task_name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting task {task_name}: {e}")

# [END dataplex_v1_dataplexservice_task_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Dataplex task."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="your-project-id",  # Replace with your Google Cloud Project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="us-central1",  # Replace with your lake's location
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-lake",  # Replace with your lake ID
        help="The ID of the lake.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-task",  # Replace with the ID of the task to delete
        help="The ID of the task to delete.",
    )
    args = parser.parse_args()

    delete_task_sample(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        task_id=args.task_id,
    )
