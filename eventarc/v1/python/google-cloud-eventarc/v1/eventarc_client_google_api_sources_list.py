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

# [START eventarc_v1_eventarc_googleapisources_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_google_api_sources(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all GoogleApiSources in a given project and location.

    A GoogleApiSource represents a subscription of first-party events from a MessageBus.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the GoogleApiSources are located
                  (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = client.common_location_path(project_id, location)

    try:
        request = eventarc_v1.ListGoogleApiSourcesRequest(parent=parent)

        page_result = client.list_google_api_sources(request=request)

        print(f"GoogleApiSources found in project {project_id}, location {location}:")
        found_sources = False
        for google_api_source in page_result:
            found_sources = True
            print(f"- Name: {google_api_source.name}")
            print(f"  Destination: {google_api_source.destination}")
            print(f"  Create Time: {google_api_source.create_time.isoformat()}")
            if google_api_source.update_time:
                print(f"  Update Time: {google_api_source.update_time.isoformat()}")
            print("---")

        if not found_sources:
            print("No GoogleApiSources found.")

    except exceptions.GoogleAPICallError as e:
        print(f"Error listing GoogleApiSources: {e}")
        print(
            "Please ensure the project ID and location are correct and that you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_googleapisources_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists GoogleApiSources in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_google_api_sources(args.project_id, args.location)
