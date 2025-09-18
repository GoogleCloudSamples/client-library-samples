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

# [START eventarc_v1_eventarc_channels_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_eventarc_channels(project_id: str, location: str) -> None:
    """Lists all Eventarc channels in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the channels are located
                  (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = eventarc_v1.ListChannelsRequest(
            parent=parent,
        )

        page_result = client.list_channels(request=request)

        print(f"Channels in project {project_id} and location {location}:")
        found_channels = False
        for channel in page_result:
            found_channels = True
            print(f"- Channel name: {channel.name}")
            print(f"  Provider: {channel.provider}")
            print(f"  Pub/Sub topic: {channel.pubsub_topic}")
            print(f"  State: {eventarc_v1.Channel.State(channel.state).name}")
            print(f"  Creation time: {channel.create_time.isoformat()}")
            if channel.update_time:
                print(f"  Update time: {channel.update_time.isoformat()}")
            print("-" * 20)

        if not found_channels:
            print("No channels found.")

    except exceptions.NotFound:
        print(f"Error: Project '{project_id}' or location '{location}' not found.")
        print(
            "Ensure the project ID and location are correct and Eventarc API is enabled."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_channels_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Eventarc channels in a given project and location."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the channels are located (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    list_eventarc_channels(args.project_id, args.location)
