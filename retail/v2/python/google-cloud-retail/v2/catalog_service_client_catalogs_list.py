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

# [START retail_v2_catalogservice_list_catalogs]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_retail_catalogs(project_id: str, location: str) -> None:
    """
    Lists all the Catalogs associated with the project.

    This method demonstrates how to retrieve a list of all catalogs configured
    under a specific Google Cloud project and location in Retail API.
    Catalogs typically represent different product data sources or environments.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global').
    """
    client = retail_v2.CatalogServiceClient()

    # The parent resource name
    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = retail_v2.ListCatalogsRequest(parent=parent)

        print(f"Listing catalogs for parent: {parent}")
        for catalog in client.list_catalogs(request=request):
            print(f"  Catalog name: {catalog.name}")
            print(f"  Catalog display name: {catalog.display_name}")
            print("-" * 20)

        print("Successfully listed catalogs.")

    except exceptions.NotFound as e:
        print(f"Error: The specified parent resource '{parent}' was not found.")
    except exceptions.PermissionDenied as e:
        print(f"Error: Permission denied to access catalogs under '{parent}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_catalogservice_list_catalogs]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Retail Catalogs for a given project and location."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the catalogs (e.g., 'global'). Defaults to 'global'.",
    )
    args = parser.parse_args()

    list_retail_catalogs(args.project_id, args.location)
