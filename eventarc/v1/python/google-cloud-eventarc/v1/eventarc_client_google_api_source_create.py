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

# [START eventarc_v1_eventarc_create_google_api_source]
from google.api_core.exceptions import AlreadyExists
from google.cloud import eventarc_v1


def create_google_api_source(
    project_id: str, location: str, google_api_source_id: str, message_bus_id: str
) -> None:
    """
    Creates a new GoogleApiSource in a specified project and location.

    A GoogleApiSource represents a subscription of 1P events from a MessageBus.
    It configures Eventarc to deliver events from a specific Google API
    service to a designated MessageBus.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the GoogleApiSource will be created
                  (e.g., "us-central1").
        google_api_source_id: The user-provided ID for the GoogleApiSource.
        message_bus_id: The ID of the MessageBus that this GoogleApiSource will
                        deliver events to. The MessageBus must already exist
                        in the same project and location.
    """
    client = eventarc_v1.EventarcClient()

    parent = client.common_location_path(project_id, location)

    message_bus_name = client.message_bus_path(project_id, location, message_bus_id)

    google_api_source = eventarc_v1.GoogleApiSource(destination=message_bus_name)

    try:
        operation = client.create_google_api_source(
            parent=parent,
            google_api_source=google_api_source,
            google_api_source_id=google_api_source_id,
        )

        print(f"Waiting for operation to complete: {operation.operation.name}")

        response = operation.result()

        print(f"Created GoogleApiSource: {response.name}")
        print(f"  UID: {response.uid}")
        print(f"  Destination MessageBus: {response.destination}")

    except AlreadyExists as e:
        print(f"Error: GoogleApiSource '{google_api_source_id}' already exists.")
        print(f"Details: {e}")
        print("Consider updating the existing GoogleApiSource or using a different ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_create_google_api_source]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new GoogleApiSource in a specified project and location."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region where the GoogleApiSource will be created (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--google_api_source_id",
        required=True,
        type=str,
        help="The user-provided ID for the GoogleApiSource. ",
    )
    parser.add_argument(
        "--message_bus_id",
        required=True,
        help="The ID of the MessageBus that this GoogleApiSource will deliver events to. ",
    )

    args = parser.parse_args()

    create_google_api_source(
        args.project_id,
        args.location,
        args.google_api_source_id,
        args.message_bus_id,
    )
