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

# [START dataplex_v1_catalogservice_entry_update]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_dataplex_entry(
    project_id: str,
    location: str,
    entry_group_id: str,
    entry_id: str,
) -> None:
    """
    Updates an existing Dataplex entry by modifying its description.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_group_id: The ID of the entry group to which the entry belongs.
        entry_id: The ID of the entry to update.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_name = client.entry_path(
        project=project_id,
        location=location,
        entry_group=entry_group_id,
        entry=entry_id,
    )

    updated_entry = dataplex_v1.Entry(
        name=entry_name,
        entry_source=dataplex_v1.EntrySource(
            description="My New Description for my Entry"
        ),
    )

    # Create a FieldMask to specify which fields of the Entry should be updated.
    # In this case, we are updating the 'entry_source.description' field.
    update_mask = field_mask_pb2.FieldMask(paths=["entry_source.description"])

    print(f"Attempting to update entry: {entry_name}")

    try:
        response = client.update_entry(entry=updated_entry, update_mask=update_mask)
        print(f"Successfully updated entry: {response.name}")
        print(f"New description: {response.entry_source.description}")
    except exceptions.NotFound:
        print(f"Error: Entry '{entry_name}' not found. Please ensure the entry exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entry_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Dataplex entry's description."
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
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the entry group to which the entry belongs.",
    )
    parser.add_argument(
        "--entry_id",
        type=str,
        required=True,
        help="The ID of the entry to update.",
    )

    args = parser.parse_args()

    update_dataplex_entry(
        args.project_id,
        args.location,
        args.entry_group_id,
        args.entry_id,
    )
