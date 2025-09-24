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

# [START dataplex_v1_catalogservice_entrygroup_create]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_entry_group(
    project_id: str,
    location: str,
    entry_group_id: str,
) -> None:
    """
    Creates an EntryGroup in Dataplex.


    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the EntryGroup will be created
            (e.g., 'us-central1').
        entry_group_id: The ID to use for the EntryGroup.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    entry_group = dataplex_v1.EntryGroup(
        display_name=f"My Example EntryGroup {entry_group_id}",
        description="This is an example EntryGroup created by a sample.",
    )

    request = dataplex_v1.CreateEntryGroupRequest(
        parent=parent,
        entry_group_id=entry_group_id,
        entry_group=entry_group,
    )

    try:
        operation = client.create_entry_group(request=request)
        response = operation.result()
        print(f"EntryGroup created successfully: {response.name}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: EntryGroup '{entry_group_id}' already exists in {parent}. "
            f"Please use a unique ID or update the existing EntryGroup if needed. Details: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entrygroup_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates an EntryGroup in Google Cloud Dataplex."
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
        help="The Google Cloud region for the EntryGroup (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help=("The ID to use for the EntryGroup"),
    )

    args = parser.parse_args()

    create_entry_group(args.project_id, args.location, args.entry_group_id)
