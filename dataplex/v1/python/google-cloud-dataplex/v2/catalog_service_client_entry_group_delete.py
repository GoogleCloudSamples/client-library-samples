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

# [START dataplex_v1_catalogservice_entrygroup_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_entry_group(
    project_id: str,
    location: str,
    entry_group_id: str,
) -> None:
    """
    Deletes an existing EntryGroup in Dataplex.


    Args:
        project_id: The ID of the Google Cloud project.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_group_id: The ID of the EntryGroup to delete.
    """
    client = dataplex_v1.CatalogServiceClient()

    name = client.entry_group_path(project_id, location, entry_group_id)

    try:
        operation = client.delete_entry_group(name=name)

        print("Waiting for EntryGroup deletion operation to complete...")

        operation.result()

        print(f"EntryGroup '{entry_group_id}' deleted successfully.")

    except exceptions.NotFound:
        print(f"Error: EntryGroup '{entry_group_id}' not found at '{name}'.")
        print("Please ensure the EntryGroup ID and location are correct.")
    except exceptions.FailedPrecondition as e:
        print(f"Error deleting EntryGroup '{entry_group_id}': {e}")
        print(
            "The EntryGroup might not be empty or has active resources. "
            "Please ensure it's empty and unlinked before deletion."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check the project ID, location ID, and your permissions. "
            "Also verify the EntryGroup ID is correctly formatted and exists."
        )


# [END dataplex_v1_catalogservice_entrygroup_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an EntryGroup in Dataplex.")
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
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the EntryGroup to delete.",
    )
    args = parser.parse_args()

    delete_entry_group(args.project_id, args.location, args.entry_group_id)
