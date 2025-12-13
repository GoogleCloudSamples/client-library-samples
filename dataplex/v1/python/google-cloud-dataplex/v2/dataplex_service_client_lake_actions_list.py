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

# [START dataplex_v1_dataplexservice_list_lake_actions]
from google.cloud import dataplex_v1


def list_lake_actions(project_id: str, location: str, lake_id: str) -> None:
    """Lists actions associated with a Dataplex lake.

    This sample demonstrates how to retrieve a list of actions that have
    occurred within a specified Dataplex lake. Actions represent automatic
    events or issues detected by Dataplex, such as data quality issues or
    resource status changes.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake is located (e.g., "us-central1").
        lake_id: The ID of the Dataplex lake to list actions for.
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # Construct the full resource name for the lake
    # Example: projects/my-project-id/locations/us-central1/lakes/my-lake-id
    lake_name = client.lake_path(project_id, location, lake_id)

    print(f"Listing actions for lake: {lake_name}")

    try:
        # Initialize request argument(s)
        request = dataplex_v1.ListLakeActionsRequest(
            parent=lake_name,
            page_size=10,  # Optional: specify page size
        )

        # Make the request
        page_result = client.list_lake_actions(request=request)

        found_actions = False
        for action in page_result:
            found_actions = True
            print(f"Action found: {action.name}")
            print(f"  Category: {action.category.name}")
            print(f"  Type: {action.issue.type_.name if action.issue else 'N/A'}")
            print(f"  Description: {action.issue.message if action.issue else 'N/A'}")
            print(f"  Start Time: {action.start_time.isoformat()}")
            if action.end_time:
                print(f"  End Time: {action.end_time.isoformat()}")
            print("-" * 20)

        if not found_actions:
            print(f"No actions found for lake: {lake_name}")

    except exceptions.NotFound:
        print(f"Error: The specified lake '{lake_name}' was not found.")
        print("Please check the project ID, location, and lake ID.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error listing lake actions: {e}")
        print(
            "Please check your project permissions and ensure the Dataplex API is enabled."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_list_lake_actions]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists actions associated with a Dataplex lake."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-samples-data",  # Replace with your project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Replace with your lake's location
        help="The Google Cloud region where the lake is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-sample-lake",  # Replace with your lake ID
        help="The ID of the Dataplex lake to list actions for.",
    )
    args = parser.parse_args()
    list_lake_actions(args.project_id, args.location, args.lake_id)
