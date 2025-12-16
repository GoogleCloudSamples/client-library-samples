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

# [START eventarc_v1_eventarc_channel_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import eventarc_v1


def get_channel(
    project_id: str,
    location: str,
    channel_id: str,
) -> None:
    """
    Retrieves a specific Eventarc channel.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the channel (e.g., "us-central1").
        channel_id: The ID of the channel to retrieve.
    """
    client = eventarc_v1.EventarcClient()

    channel_name = client.channel_path(project_id, location, channel_id)

    try:
        channel = client.get_channel(name=channel_name)

        print(f"Channel: {channel.name}")
        print(f"Provider: {channel.provider}")
        print(f"State: {channel.state.name}")
        print(f"Pub/Sub topic: {channel.pubsub_topic}")
    except core_exceptions.NotFound:
        print(f"Channel '{channel_name}' not found.")
        print("Ensure the channel ID and location are correct.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END eventarc_v1_eventarc_channel_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Eventarc channel."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        help="The location of the channel (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--channel_id",
        help="The ID of the channel to retrieve.",
        required=True,
    )
    args = parser.parse_args()

    get_channel(args.project_id, args.location, args.channel_id)
