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

# [START dataplex_v1_catalogservice_create_entry_type]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_entry_type(
    project_id: str,
    location: str,
    entry_type_id: str,
) -> None:
    """
    Creates an EntryType in Dataplex Universal Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us-central1").
        entry_type_id: The ID of the EntryType to create.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"
    entry_type = dataplex_v1.EntryType(
        display_name=f"My Sample Entry Type {entry_type_id}",
        description="A sample EntryType for demonstration purposes.",
        type_aliases=["TABLE"],  # Example: This EntryType represents a TABLE
        platform="BIGQUERY",  # Example: Entries of this type are from BigQuery
        system="BIGQUERY",  # Example: Entries of this type are from BigQuery
    )

    try:
        print(f"Creating EntryType {entry_type_id} in {parent}...")
        operation = client.create_entry_type(
            parent=parent,
            entry_type_id=entry_type_id,
            entry_type=entry_type,
        )

        response = operation.result()
        print(f"Successfully created EntryType: {response.name}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: EntryType '{entry_type_id}' already exists in {parent}. "
            f"Please use a unique ID or update the existing EntryType. Details: {e}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: The specified parent location '{parent}' was not found. "
            f"Please ensure the project ID and location are correct. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_create_entry_type]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates an EntryType in Dataplex Universal Catalog."
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
        help="The Google Cloud region for the EntryType (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of the EntryType to create",
    )
    args = parser.parse_args()

    create_entry_type(args.project_id, args.location, args.entry_type_id)
