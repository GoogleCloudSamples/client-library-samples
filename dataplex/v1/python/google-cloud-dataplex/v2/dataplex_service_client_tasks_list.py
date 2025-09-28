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

# [START dataplex_v1_dataplexservice_tasks_list]
from google.cloud import dataplex_v1
from google.api_core import exceptions

def list_tasks_sample(
    project_id: str,
    location: str,
    lake_id: str,
) -> None:
    """Lists tasks under a given lake.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region.
        lake_id: The ID of the lake to list tasks from.
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # The resource name of the parent lake
    # projects/{project_number}/locations/{location_id}/lakes/{lake_id}
    parent = f"projects/{project_id}/locations/{location}/lakes/{lake_id}"

    try:
        # Construct the request
        request = dataplex_v1.ListTasksRequest(parent=parent)

        # Make the request and iterate over the results
        print(f"Listing tasks for lake: {parent}")
        page_result = client.list_tasks(request=request)

        found_tasks = False
        for task in page_result:
            print(f"Task found: {task.name}")
            found_tasks = True

        if not found_tasks:
            print(f"No tasks found for lake: {parent}")

    except exceptions.NotFound:
        print(f"Error: Lake '{parent}' not found. Please ensure the project, location, and lake ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END dataplex_v1_dataplexservice_tasks_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists tasks under a given Dataplex lake."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # Replace with your Google Cloud Project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Replace with your desired region
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="your-lake-id",  # Replace with your Dataplex Lake ID
        help="The ID of the lake to list tasks from.",
    )
    args = parser.parse_args()

    list_tasks_sample(args.project_id, args.location, args.lake_id)
