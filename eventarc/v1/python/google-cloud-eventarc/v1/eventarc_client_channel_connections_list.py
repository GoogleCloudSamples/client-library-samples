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

# [START eventarc_v1_eventarc_channelconnections_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import eventarc_v1


def list_channel_connections(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all ChannelConnection resources in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The region for the ChannelConnection resources (e.g., 'us-central1').
    """
    client = eventarc_v1.EventarcClient()
    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = eventarc_v1.ListChannelConnectionsRequest(parent=parent)
        page_result = client.list_channel_connections(request=request)

        found_connections = False
        for channel_connection in page_result:
            found_connections = True
            print(f"- {channel_connection.name}")

        if not found_connections:
            print("No ChannelConnections found.")

    except GoogleAPICallError as e:
        print(f"Error listing ChannelConnections: {e}")
        print(
            "Please ensure that the project ID and location are correct "
            "and that the authenticated account has the necessary permissions "
            "(e.g., eventarc.channelConnections.list)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_channelconnections_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists ChannelConnection resources in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID (e.g., 'your-project-id').",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The region for the ChannelConnection resources (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_channel_connections(args.project_id, args.location)
