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

# [START dataplex_v1_catalogservice_entry_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_entry(
    project_id: str, location: str, entry_group_id: str, entry_id: str
) -> None:
    """
    Deletes a Dataplex Entry.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region to use (e.g., 'us-central1').
        entry_group_id: The ID of the entry group containing the entry.
        entry_id: The ID of the entry to delete.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_name = client.entry_path(
        project=project_id,
        location=location,
        entry_group=entry_group_id,
        entry=entry_id,
    )
    try:
        response = client.delete_entry(name=entry_name)
        print(f"Successfully deleted entry: {response.name}")
    except exceptions.NotFound:
        print(f"Entry {entry_name} not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting entry {entry_name}: {e}")


# [END dataplex_v1_catalogservice_entry_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataplex Entry.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region to use (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the entry group containing the entry.",
    )
    parser.add_argument(
        "--entry_id",
        type=str,
        required=True,
        help="The ID of the entry to delete.",
    )

    args = parser.parse_args()

    delete_entry(args.project_id, args.location, args.entry_group_id, args.entry_id)
