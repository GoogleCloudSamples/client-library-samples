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

# [START eventarc_v1_eventarc_googleapisource_update]
from google.api_core import exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2


def update_google_api_source(
    project_id: str,
    location: str,
    google_api_source_id: str,
    new_display_name: str,
) -> None:
    """
    Updates a GoogleApiSource's display name.

    This sample demonstrates how to update specific fields of an existing GoogleApiSource
    resource. It uses a field mask to ensure that only the `display_name` field is modified,
    leaving other configurations of the source untouched.

    Args:
        project_id: The Google Cloud project ID.
        location: The region of the GoogleApiSource (e.g., "us-central1").
        google_api_source_id: The ID of the GoogleApiSource to update.
        new_display_name: The new display name for the GoogleApiSource.
    """
    client = eventarc_v1.EventarcClient()

    google_api_source_name = client.google_api_source_path(
        project_id, location, google_api_source_id
    )

    # Create a GoogleApiSource object with the new display name.
    # Only the fields specified in the update_mask will be updated.
    google_api_source = eventarc_v1.GoogleApiSource(
        name=google_api_source_name,
        display_name=new_display_name,
    )

    # Create a FieldMask to specify that only the 'display_name' field should be updated.
    # This is crucial for partial updates to avoid unintentionally resetting other fields.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_google_api_source(
            google_api_source=google_api_source, update_mask=update_mask
        )

        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()

        print("GoogleApiSource updated successfully:")
        print(f"Name: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Update Time: {response.update_time}")

    except exceptions.NotFound:
        print(
            f"Error: GoogleApiSource '{google_api_source_name}' not found. "
            "Ensure the GoogleApiSource ID and location are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_googleapisource_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a GoogleApiSource's display name."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The region of the GoogleApiSource (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--google_api_source_id",
        help="The ID of the GoogleApiSource to update.",
        required=True,
    )
    parser.add_argument(
        "--new_display_name",
        help="The new display name for the GoogleApiSource.",
        default="My New Display Name",
    )

    args = parser.parse_args()

    update_google_api_source(
        args.project_id,
        args.location,
        args.google_api_source_id,
        args.new_display_name,
    )
