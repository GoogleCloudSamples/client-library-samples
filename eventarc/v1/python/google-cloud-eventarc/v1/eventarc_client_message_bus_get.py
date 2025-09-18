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

# [START eventarc_v1_eventarc_get_message_bus]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_message_bus(
    project_id: str,
    location: str,
    message_bus_id: str,
) -> None:
    """
    Retrieves a specific MessageBus resource.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the MessageBus is located (e.g., "us-central1").
        message_bus_id: The ID of the MessageBus to retrieve.
    """
    client = eventarc_v1.EventarcClient()

    name = client.message_bus_path(project_id, location, message_bus_id)

    try:
        message_bus = client.get_message_bus(name=name)
        print(f"MessageBus: {message_bus.name}")
        print(f"  UID: {message_bus.uid}")
        print(f"  Display Name: {message_bus.display_name}")
        print(f"  Create Time: {message_bus.create_time}")
        print(f"  Update Time: {message_bus.update_time}")
        if message_bus.crypto_key_name:
            print(f"  KMS Key: {message_bus.crypto_key_name}")
    except exceptions.NotFound:
        print(f"MessageBus '{name}' not found.")
    except Exception as e:
        print(f"Error retrieving MessageBus '{name}': {e}")


# [END eventarc_v1_eventarc_get_message_bus]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Eventarc MessageBus."
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
        help="The region where the MessageBus is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--message_bus_id",
        type=str,
        required=True,
        help="The ID of the MessageBus to retrieve.",
    )

    args = parser.parse_args()

    get_message_bus(args.project_id, args.location, args.message_bus_id)
