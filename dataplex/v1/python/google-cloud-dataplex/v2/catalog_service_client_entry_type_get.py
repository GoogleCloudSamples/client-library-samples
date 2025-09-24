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

# [START dataplex_v1_catalogservice_entrytype_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_entry_type(
    project_id: str,
    location: str,
    entry_type_id: str,
) -> None:
    """
    Retrieves the details of a specific EntryType.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_type_id: The ID of the EntryType to retrieve.
    """
    client = dataplex_v1.CatalogServiceClient()

    name = client.entry_type_path(project_id, location, entry_type_id)

    try:
        entry_type = client.get_entry_type(name=name)

        print(f"Successfully retrieved EntryType: {entry_type.name}")
        print(f"Display Name: {entry_type.display_name}")
        print(f"Description: {entry_type.description}")
        print(f"Platform: {entry_type.platform}")
        print(f"System: {entry_type.system}")
        print(f"Type Aliases: {', '.join(entry_type.type_aliases)}")

    except exceptions.NotFound:
        print(f"Error: EntryType '{name}' not found.")
        print(
            "Please ensure the project ID, location ID, and entry type ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entrytype_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieves a Dataplex EntryType.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The ID of the location where the EntryType exists (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of the EntryType to retrieve.",
    )
    args = parser.parse_args()

    get_entry_type(
        project_id=args.project_id,
        location=args.location,
        entry_type_id=args.entry_type_id,
    )
