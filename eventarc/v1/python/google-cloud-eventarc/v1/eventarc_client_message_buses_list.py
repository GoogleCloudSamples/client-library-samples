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

# [START eventarc_v1_eventarc_messagebuses_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_message_buses(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all message buses in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = client.common_location_path(project_id, location)

    try:
        request = eventarc_v1.ListMessageBusesRequest(parent=parent)

        page_result = client.list_message_buses(request=request)

        print(f"Message Buses in {parent}:")
        found_message_buses = False
        for message_bus in page_result:
            found_message_buses = True
            print(f"- {message_bus.name}")

        if not found_message_buses:
            print("No message buses found.")

    except exceptions.NotFound:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' does not exist or has no message buses."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_messagebuses_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all message buses in a given project and location."
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
        help="The Google Cloud location (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_message_buses(args.project_id, args.location)
