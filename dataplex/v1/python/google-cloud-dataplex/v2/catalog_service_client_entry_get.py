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

# [START dataplex_v1_catalogservice_entry_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import dataplex_v1


def get_dataplex_entry(
    project_id: str, location: str, entry_group_id: str, entry_id: str
) -> None:
    """
    Retrieves a Dataplex Entry by its full resource name.


    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us-central1").
        entry_group_id: The ID of the Entry Group containing the entry.
        entry_id: The ID of the Entry to retrieve.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_name = client.entry_path(project_id, location, entry_group_id, entry_id)

    request = dataplex_v1.GetEntryRequest(
        name=entry_name,
        view=dataplex_v1.EntryView.FULL,
    )

    try:
        response = client.get_entry(request=request)

        print(f"Successfully retrieved Entry: {response.name}")
        if response.entry_source and response.entry_source.display_name:
            print(f"  Display Name: {response.entry_source.display_name}")
        print(f"  Entry Type: {response.entry_type}")
        if response.create_time:
            print(f"  Create Time: {response.create_time.isoformat()}")
        if response.update_time:
            print(f"  Update Time: {response.update_time.isoformat()}")

        if response.aspects:
            print("  Aspects:")
            for aspect_key, aspect_value in response.aspects.items():
                print(f"    {aspect_key}: {aspect_value.data}")

    except core_exceptions.NotFound:
        print(f"Error: Entry '{entry_name}' not found.")
        print(
            "Please ensure the project ID, location, entry group ID, and entry ID are correct "
            "and the entry exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entry_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Dataplex Entry by its full resource name."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
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
        help="The ID of the Entry Group containing the entry.",
    )
    parser.add_argument(
        "--entry_id",
        type=str,
        required=True,
        help="The ID of the Entry to retrieve.",
    )
    args = parser.parse_args()

    get_dataplex_entry(
        project_id=args.project_id,
        location=args.location,
        entry_group_id=args.entry_group_id,
        entry_id=args.entry_id,
    )
