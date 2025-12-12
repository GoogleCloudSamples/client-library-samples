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

# [START dataplex_v1_dataplexservice_task_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1

def get_dataplex_task(
    project_id: str,
    location_id: str,
    lake_id: str,
    task_id: str,
) -> None:
    """Retrieves a Dataplex task.

    A Dataplex task represents a user-visible job that performs data processing
    or management operations within a lake. This sample demonstrates how to fetch
    details of an existing task using its resource name.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the lake is located (e.g., 'us-central1').
        lake_id: The ID of the lake.
        task_id: The ID of the task to retrieve.
    """
    # Create a Dataplex service client.
    # The client is responsible for connecting to the Dataplex API.
    # It's recommended to create the client once and reuse it across multiple calls.
    client = dataplex_v1.DataplexServiceClient()

    # Construct the full resource name for the task.
    # This name uniquely identifies the task within Google Cloud.
    task_name = client.task_path(project_id, location_id, lake_id, task_id)

    # Create the GetTaskRequest with the task's resource name.
    request = dataplex_v1.GetTaskRequest(name=task_name)

    try:
        # Send the request and retrieve the task details.
        task = client.get_task(request=request)

        # Print the retrieved task's information.
        print(f"Successfully retrieved task: {task.name}")
        print(f"  Display Name: {task.display_name}")
        print(f"  Description: {task.description}")
        print(f"  State: {task.state.name}")
        print(f"  Create Time: {task.create_time}")
        # Check for task type specific configurations (Spark or Notebook)
        if task.spark:
            print(f"  Spark Main Jar File URI: {task.spark.main_jar_file_uri}")
        elif task.notebook:
            print(f"  Notebook Path: {task.notebook.notebook}")

    except exceptions.NotFound:
        # Handle the case where the specified task does not exist.
        print(f"Error: Task '{task_name}' not found.")
        print("Please ensure the project ID, location ID, lake ID, and task ID are correct.")
    except Exception as e:
        # Catch any other unexpected API errors.
        print(f"An unexpected error occurred: {e}")
        # In a production environment, you might log the error for further investigation.

# [END dataplex_v1_dataplexservice_task_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Dataplex task."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-samples-data", # Example: "cloud-samples-data"
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="us-central1", # Example: "us-central1"
        help="The Google Cloud region where the lake is located.",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-sample-lake", # Example: "my-sample-lake"
        help="The ID of the lake.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-sample-task", # Example: "my-sample-task"
        help="The ID of the task to retrieve.",
    )
    args = parser.parse_args()

    get_dataplex_task(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        task_id=args.task_id,
    )
