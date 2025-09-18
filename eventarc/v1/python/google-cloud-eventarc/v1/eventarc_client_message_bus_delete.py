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

# [START eventarc_v1_eventarc_messagebus_delete]
import google.api_core.exceptions
from google.cloud import eventarc_v1


def delete_message_bus(
    project_id: str,
    location: str,
    message_bus_id: str,
) -> None:
    """Deletes a specified MessageBus.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the MessageBus is located (e.g., "us-central1").
        message_bus_id: The ID of the MessageBus to delete.
    """
    client = eventarc_v1.EventarcClient()

    name = client.message_bus_path(project_id, location, message_bus_id)

    try:
        print(f"Deleting MessageBus: {name}...")
        operation = client.delete_message_bus(name=name)
        operation.result()
        print(f"MessageBus {name} deleted successfully.")
    except google.api_core.exceptions.NotFound:
        print(
            f"MessageBus {name} not found. It might have already been deleted or never existed."
        )
        print("Ensure the MessageBus ID and location are correct.")
    except google.api_core.exceptions.Conflict:
        print(
            f"MessageBus {name} can't be deleted due to a conflict. It might be in use."
        )
        print(
            "Ensure no other resources depend on this MessageBus before attempting to delete it."
        )
    except Exception as e:
        print(f"An unexpected error occurred while deleting MessageBus {name}: {e}")


# [END eventarc_v1_eventarc_messagebus_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an Eventarc MessageBus.")
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
        help="The ID of the MessageBus to delete.",
    )
    args = parser.parse_args()

    delete_message_bus(args.project_id, args.location, args.message_bus_id)
