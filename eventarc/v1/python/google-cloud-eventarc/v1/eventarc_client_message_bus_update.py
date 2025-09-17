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

# [START eventarc_v1_eventarc_messagebus_update]
from google.api_core import exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2


def update_message_bus(
    project_id: str,
    location: str,
    message_bus_id: str,
    new_display_name: str,
) -> None:
    """
    Updates an existing Eventarc MessageBus's display name.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the MessageBus is located (e.g., "us-central1").
        message_bus_id: The ID of the MessageBus to update. This must be a valid
            MessageBus ID, e.g., 'my-message-bus-1'.
        new_display_name: The new display name for the MessageBus.
    """
    client = eventarc_v1.EventarcClient()

    message_bus_name = client.message_bus_path(project_id, location, message_bus_id)

    message_bus = eventarc_v1.MessageBus(
        name=message_bus_name,
        display_name=new_display_name,
    )

    # Create a FieldMask to specify that only the 'display_name' field should be updated.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = eventarc_v1.UpdateMessageBusRequest(
        message_bus=message_bus,
        update_mask=update_mask,
    )

    try:
        operation = client.update_message_bus(request=request)
        print("Waiting for operation to complete...")
        response = operation.result()

        print(f"MessageBus updated successfully: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"Last updated time: {response.update_time}")
    except exceptions.NotFound:
        print(
            f"Error: MessageBus '{message_bus_name}' not found. "
            "Please ensure the message bus exists before attempting to update it."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END eventarc_v1_eventarc_messagebus_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates an Eventarc MessageBus.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The region of the MessageBus (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--message_bus_id",
        required=True,
        type=str,
        help="The ID of the MessageBus to update, e.g., 'my-message-bus-1'.",
    )
    parser.add_argument(
        "--new_display_name",
        default="My New Display Name",
        type=str,
        help="The new display name for the MessageBus.",
    )
    args = parser.parse_args()

    update_message_bus(
        args.project_id,
        args.location,
        args.message_bus_id,
        args.new_display_name,
    )
