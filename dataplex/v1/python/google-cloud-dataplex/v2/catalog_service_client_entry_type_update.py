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

# [START dataplex_v1_catalogservice_entrytype_update]
from google.api_core import exceptions as core_exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_entry_type(
    project_id: str,
    location: str,
    entry_type_id: str,
) -> None:
    """
    Updates an existing EntryType in Dataplex Universal Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_type_id: The ID of the EntryType to update.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_type_name = client.entry_type_path(project_id, location, entry_type_id)

    updated_entry_type = dataplex_v1.EntryType(
        name=entry_type_name,
        display_name="Updated Example EntryType Display Name",
        description="This is an updated description for the example EntryType.",
        # Optional: You can also update labels or other fields.
        # labels={"new_key": "new_value"},
    )

    # Create a FieldMask to specify which fields of the EntryType to update.
    # Only fields specified in the update_mask will be modified.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    try:
        operation = client.update_entry_type(
            entry_type=updated_entry_type,
            update_mask=update_mask,
        )

        response = operation.result()
        print(f"EntryType '{response.name}' updated successfully.")
        print(f"Updated Display Name: {response.display_name}")
        print(f"Updated Description: {response.description}")

    except core_exceptions.NotFound:
        print(f"Error: EntryType '{entry_type_name}' not found.")
        print("Please ensure the EntryType ID and location are correct.")
    except core_exceptions.GoogleAPICallError as e:
        print(f"Error updating EntryType '{entry_type_name}': {e}")
        print("Please check your project ID, location, and permissions.")


# [END dataplex_v1_catalogservice_entrytype_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Dataplex EntryType."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of the EntryType to update.",
    )
    args = parser.parse_args()

    update_entry_type(args.project_id, args.location, args.entry_type_id)
