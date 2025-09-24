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

# [START dataplex_v1_catalogservice_entrygroup_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_entry_group(
    project_id: str,
    location: str,
    entry_group_id: str,
) -> None:
    """Retrieves a Dataplex EntryGroup.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_group_id: The ID of the EntryGroup to retrieve.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_group_name = client.entry_group_path(
        project=project_id,
        location=location,
        entry_group=entry_group_id,
    )

    try:
        request = dataplex_v1.GetEntryGroupRequest(name=entry_group_name)

        entry_group = client.get_entry_group(request=request)

        print(f"Successfully retrieved EntryGroup: {entry_group.name}")
        print(f"Display Name: {entry_group.display_name}")
        print(f"Description: {entry_group.description}")
        print(f"Create Time: {entry_group.create_time.isoformat()}")

    except exceptions.NotFound as e:
        print(f"Error: EntryGroup '{entry_group_name}' not found.")
        print(f"Please ensure the EntryGroup ID and location are correct. Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred for EntryGroup '{entry_group_name}': {e}")
        print("Please check the request parameters and your project's permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entrygroup_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieves a Dataplex EntryGroup.")
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
        help="The ID of the EntryGroup to retrieve.",
    )
    args = parser.parse_args()

    get_entry_group(args.project_id, args.location, args.entry_group_id)
