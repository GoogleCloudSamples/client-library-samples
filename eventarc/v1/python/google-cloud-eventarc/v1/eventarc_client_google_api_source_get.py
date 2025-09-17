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

# [START eventarc_v1_eventarc_googleapisource_get]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_google_api_source(
    project_id: str,
    location: str,
    google_api_source_id: str,
) -> None:
    """
    Retrieves details of a specific GoogleApiSource.

    A GoogleApiSource represents a subscription to first-party Google Cloud events
    from a MessageBus. This sample demonstrates how to fetch the configuration
    details of an existing GoogleApiSource.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the GoogleApiSource is located
                  (e.g., "us-central1").
        google_api_source_id: The ID of the GoogleApiSource to retrieve.
    """
    client = eventarc_v1.EventarcClient()

    name = client.google_api_source_path(
        project_id,
        location,
        google_api_source_id,
    )

    try:
        request = eventarc_v1.GetGoogleApiSourceRequest(name=name)
        google_api_source = client.get_google_api_source(request=request)

        print(f"Successfully retrieved GoogleApiSource: {google_api_source.name}")
        print(f"  UID: {google_api_source.uid}")
        print(f"  Destination MessageBus: {google_api_source.destination}")
        if google_api_source.crypto_key_name:
            print(f"  KMS Key: {google_api_source.crypto_key_name}")

    except exceptions.NotFound:
        print(f"GoogleApiSource '{name}' not found.")
    except Exception as e:
        print(f"Error retrieving GoogleApiSource '{name}': {e}")


# [END eventarc_v1_eventarc_googleapisource_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves details of a specific GoogleApiSource."
    )
    parser.add_argument(
        "--project_id", help="The Google Cloud project ID.", required=True, type=str
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region where the GoogleApiSource is located (e.g., 'us-central1').",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--google_api_source_id",
        help="The ID of the GoogleApiSource to retrieve.",
        required=True,
        type=str,
    )

    args = parser.parse_args()

    get_google_api_source(
        args.project_id,
        args.location,
        args.google_api_source_id,
    )
