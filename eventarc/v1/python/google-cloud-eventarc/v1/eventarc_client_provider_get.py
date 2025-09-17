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

# [START eventarc_v1_eventarc_provider_get]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_eventarc_provider(
    project_id: str,
    location: str,
    provider_id: str,
) -> None:
    """
    Retrieves a specific Eventarc provider.

    This function demonstrates how to fetch details of a particular Eventarc
    provider, such as 'google', which represents Google-managed event sources.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the provider is located (e.g., "us-central1").
        provider_id: The ID of the provider to retrieve (e.g., "google").
    """
    client = eventarc_v1.EventarcClient()

    provider_name = client.provider_path(project_id, location, provider_id)

    try:
        provider = client.get_provider(name=provider_name)

        print(f"Successfully retrieved provider: {provider.name}")
        print(f"Display Name: {provider.display_name}")
        print("Available Event Types:")
        for event_type in provider.event_types:
            print(f"  - Type: {event_type.type}, Description: {event_type.description}")

    except exceptions.NotFound:
        print(f"Error: Provider '{provider_name}' not found.")
        print("Please ensure the provider ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please check your network connection, project ID, and ensure you have the necessary permissions."
        )


# [END eventarc_v1_eventarc_provider_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Eventarc provider."
    )
    parser.add_argument(
        "project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region where the provider is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--provider_id",
        type=str,
        default="google",
        help="The ID of the provider to retrieve (e.g., 'google').",
    )

    args = parser.parse_args()

    get_eventarc_provider(args.project_id, args.location, args.provider_id)
