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

# [START dataplex_v1_catalogservice_entrygroups_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_entry_groups(project_id: str, location: str) -> None:
    """
    Lists Dataplex EntryGroup resources in a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (region) to list entry groups from.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = dataplex_v1.ListEntryGroupsRequest(
            parent=parent,
        )
        print(
            f"Listing Entry Groups in location {location} for project {project_id}:"
        )
        page_result = client.list_entry_groups(request=request)

        found_entry_groups = False
        for entry_group in page_result:
            found_entry_groups = True
            print(f"Entry Group found: {entry_group.name}")
            print(f"  Display Name: {entry_group.display_name}")
            print(f"  Description: {entry_group.description}")
            print(f"  UID: {entry_group.uid}")
            print(f"  Create Time: {entry_group.create_time}")

        if not found_entry_groups:
            print(
                f"No Entry Groups found in location {location} for project {project_id}."
            )

    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided. Please check the project ID and location ID. Details: {e}"
        )
    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Ensure the service account has the necessary roles (e.g., Dataplex Viewer). Details: {e}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' was not found. Details: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An unexpected API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entrygroups_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataplex EntryGroup resources in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str, required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str, required=True,
        help="The ID of the Google Cloud location (region) to list entry groups from.",
    )
    args = parser.parse_args()
    list_entry_groups(args.project_id, args.location)
