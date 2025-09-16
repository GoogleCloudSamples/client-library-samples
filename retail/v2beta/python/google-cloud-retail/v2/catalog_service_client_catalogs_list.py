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

# [START retail_v2beta_catalogservice_catalogs_list]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def list_retail_catalogs(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all the Catalogs associated with the project.

    This method demonstrates how to retrieve a list of all available product
    catalogs for a given Google Cloud project and location. Each catalog
    represents a distinct set of products and their associated configurations.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global').
    """
    client = retail_v2beta.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    request = retail_v2beta.ListCatalogsRequest(
        parent=parent,
    )

    try:
        print("Listing catalogs:")
        page_result = client.list_catalogs(request=request)

        found_catalogs = False
        for catalog in page_result:
            found_catalogs = True
            print(f"  Catalog name: {catalog.name}")
            print(f"  Catalog display name: {catalog.display_name}")
            print(
                f"  Ingestion Product Type: {catalog.product_level_config.ingestion_product_type}"
            )
            print("---")

        if not found_catalogs:
            print(f"No catalogs found for project {project_id} in location {location}.")

    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Please ensure the service account has the necessary permissions for project {project_id} and location {location}. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_catalogservice_catalogs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Retail Catalogs for a given project and location."
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
        default="global",
        help="The Google Cloud location (e.g., 'global'). Defaults to 'global'.",
    )

    args = parser.parse_args()

    list_retail_catalogs(args.project_id, args.location)
