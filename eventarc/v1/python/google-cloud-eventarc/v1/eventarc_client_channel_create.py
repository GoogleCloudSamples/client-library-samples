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

# [START eventarc_v1_eventarc_channel_create]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def create_channel(project_id: str, location: str, channel_id: str) -> None:
    """
    Creates a new Eventarc channel.

    A channel is a resource on which event providers publish their events.
    The published events are delivered through the transport associated with the channel.
    Note that a channel is associated with exactly one event provider.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the channel will be created (e.g., "us-central1").
        channel_id: The user-provided ID to be assigned to the channel.
    """
    client = eventarc_v1.EventarcClient()

    parent = client.common_location_path(project_id, location)

    channel = eventarc_v1.Channel(
        name=client.channel_path(project_id, location, channel_id),
    )

    request = eventarc_v1.CreateChannelRequest(
        parent=parent,
        channel=channel,
        channel_id=channel_id,
    )

    try:
        operation = client.create_channel(request=request)
        response = operation.result()

        print(f"Channel created: {response.name}")
        print(f"Provider: {response.provider}")
        print(f"State: {response.state.name}")
        print(f"Pub/Sub Topic: {response.pubsub_topic}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: Channel '{channel_id}' already exists in project '{project_id}' and location '{location}'."
        )
        print(f"Please choose a different channel ID or delete the existing one.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_channel_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Eventarc channel.")
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
        help="The Google Cloud region where the channel will be created (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--channel_id",
        type=str,
        required=True,
        help="The user-provided ID to be assigned to the channel.",
    )

    args = parser.parse_args()

    create_channel(args.project_id, args.location, args.channel_id)
