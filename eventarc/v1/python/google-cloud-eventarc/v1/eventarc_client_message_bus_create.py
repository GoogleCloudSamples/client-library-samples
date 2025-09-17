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

# [START eventarc_v1_eventarc_messagebus_create]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def create_message_bus(project_id: str, location: str, message_bus_id: str) -> None:
    """Creates a new MessageBus in a particular project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the MessageBus will be created (e.g., 'us-central1').
        message_bus_id: The ID to be assigned to the MessageBus.
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    message_bus = eventarc_v1.MessageBus()

    try:
        operation = client.create_message_bus(
            parent=parent, message_bus=message_bus, message_bus_id=message_bus_id
        )

        print("Waiting for operation to complete...")
        response = operation.result()

        print(f"MessageBus created: {response.name}")
        print(f"UID: {response.uid}")
        print(f"Create Time: {response.create_time}")

    except exceptions.AlreadyExists:
        print(
            f"MessageBus '{message_bus_id}' already exists in project '{project_id}' "
            f"and location '{location}'. Skipping creation."
        )
    except Exception as e:
        print(f"Error creating MessageBus: {e}")


# [END eventarc_v1_eventarc_messagebus_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Eventarc MessageBus.")
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The region where the MessageBus will be created (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--message_bus_id",
        required=True,
        help="The ID to be assigned to the MessageBus. ",
    )
    args = parser.parse_args()

    create_message_bus(args.project_id, args.location, args.message_bus_id)
