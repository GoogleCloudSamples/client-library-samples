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

# [START dataplex_v1_catalogservice_entries_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_entries(
    project_id: str,
    location: str,
    entry_group_id: str,
) -> None:
    """
    Lists entries within a specified EntryGroup in Dataplex Universal Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., 'us-central1').
        entry_group_id: The ID of the EntryGroup to list entries from.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent_entry_group_name = client.entry_group_path(
        project=project_id, location=location, entry_group=entry_group_id
    )

    request = dataplex_v1.ListEntriesRequest(parent=parent_entry_group_name)

    try:
        print(f"Listing entries for EntryGroup: {parent_entry_group_name}")
        page_result = client.list_entries(request=request)

        found_entries = False
        for entry in page_result:
            found_entries = True
            print(f"  Entry name: {entry.name}")
            print(f"    Entry Type: {entry.entry_type}")
            if entry.fully_qualified_name:
                print(f"    Fully Qualified Name: {entry.fully_qualified_name}")
            if entry.entry_source and entry.entry_source.resource:
                print(f"    Source Resource: {entry.entry_source.resource}")

        if not found_entries:
            print(f"  No entries found in EntryGroup: {entry_group_id}")

    except exceptions.NotFound as e:
        print(f"Error: The specified EntryGroup '{entry_group_id}' was not found.")
        print(
            f"Please ensure the EntryGroup exists and the path '{parent_entry_group_name}' is correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entries_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists entries within a specified Dataplex EntryGroup."
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
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the EntryGroup to list entries from.",
    )
    args = parser.parse_args()

    list_entries(args.project_id, args.location, args.entry_group_id)
