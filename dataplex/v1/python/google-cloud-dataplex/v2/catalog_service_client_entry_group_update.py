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

# [START dataplex_v1_catalogservice_update_entry_group]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_entry_group(
    project_id: str,
    location: str,
    entry_group_id: str,
) -> None:
    """
    Updates an existing EntryGroup in Dataplex.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'us-central1').
        entry_group_id: The ID of the EntryGroup to update.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_group_name = client.entry_group_path(project_id, location, entry_group_id)

    new_display_name = "Updated Test Entry Group Display Name"
    new_description = "This is an updated description for the test entry group."

    entry_group = dataplex_v1.EntryGroup(
        name=entry_group_name,
        display_name=new_display_name,
        description=new_description,
    )

    # Specify which fields to update using a FieldMask
    # This is important to ensure only specified fields are modified.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    print(f"Updating EntryGroup: {entry_group_name}...")
    try:
        operation = client.update_entry_group(
            request={
                "entry_group": entry_group,
                "update_mask": update_mask,
            }
        )
        result = operation.result()
        print(f"EntryGroup updated: {result.name}")
        print(f"  Display Name: {result.display_name}")
        print(f"  Description: {result.description}")
        print(f"  Update Time: {result.update_time.isoformat()}")
    except exceptions.NotFound:
        print(
            f"Error: EntryGroup '{entry_group_id}' not found in location '{location}'."
        )
        print("Please ensure the EntryGroup ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    # [END dataplex_v1_catalogservice_update_entry_group]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Dataplex EntryGroup."
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
        help="The Google Cloud location for the EntryGroup (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the EntryGroup to update.",
    )

    args = parser.parse_args()

    update_entry_group(
        project_id=args.project_id,
        location=args.location,
        entry_group_id=args.entry_group_id,
    )
