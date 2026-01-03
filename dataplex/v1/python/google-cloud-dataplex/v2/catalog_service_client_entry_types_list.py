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

# [START dataplex_v1_catalogservice_entrytypes_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_entry_types(
    project_id: str,
    location: str,
) -> None:
    """
    Lists existing EntryType resources in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to list the EntryTypes from.
                  For example: "us-central1".
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    request = dataplex_v1.ListEntryTypesRequest(parent=parent)

    try:
        page_result = client.list_entry_types(request=request)

        print(f"Listing EntryTypes in {parent}:")
        found_entry_types = False
        for entry_type in page_result:
            found_entry_types = True
            print(f"- Found EntryType: {entry_type.name}")

        if not found_entry_types:
            print("No EntryTypes found in this location.")

    except exceptions.NotFound:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' was not found."
        )
        print(
            "Please ensure the project ID and location are correct and that the Dataplex API is enabled."
        )
    except exceptions.PermissionDenied:
        print(f"Error: Permission denied to list EntryTypes in '{parent}'.")
        print(
            "Please ensure your service account or user has the necessary Dataplex permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please check your project configuration, network connectivity, or try again later."
        )


# [END dataplex_v1_catalogservice_entrytypes_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists existing EntryType resources in a given project and location."
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
        help="The Google Cloud region to list the EntryTypes from (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_entry_types(args.project_id, args.location)
