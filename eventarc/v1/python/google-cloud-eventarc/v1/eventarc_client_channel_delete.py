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

# [START eventarc_v1_eventarc_channel_delete]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def delete_channel(
    project_id: str,
    location: str,
    channel_id: str,
) -> None:
    """Deletes an Eventarc channel.

    Eventarc channels are resources that event providers use to publish events.
    Deleting a channel removes its association with the event provider and stops
    event delivery through it.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the channel is located (e.g., "us-central1").
        channel_id: The ID of the channel to delete.
    """
    client = eventarc_v1.EventarcClient()

    channel_name = client.channel_path(project_id, location, channel_id)

    try:
        operation = client.delete_channel(name=channel_name)
        response = operation.result()
        print(f"Channel deleted successfully: {response.name}")
    except exceptions.NotFound:
        print(f"Channel {channel_name} not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while deleting channel {channel_name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_channel_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an Eventarc channel.")
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The region where the channel is located (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--channel_id",
        help="The ID of the channel to delete.",
        required=True,
    )
    args = parser.parse_args()
    delete_channel(args.project_id, args.location, args.channel_id)
