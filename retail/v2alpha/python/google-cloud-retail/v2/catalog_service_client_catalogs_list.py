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

# [START retail_v2alpha_list_catalogs]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2alpha


def list_catalogs(
    project_id: str,
    location: str,
) -> None:
    """Lists all catalogs associated with the project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
    """
    client = retail_v2alpha.CatalogServiceClient()

    # Construct the parent resource name.
    parent = f"projects/{project_id}/locations/{location}"

    request = retail_v2alpha.ListCatalogsRequest(parent=parent)

    try:
        for catalog in client.list_catalogs(request=request):
            print(f"Catalog name: {catalog.name}")
            print(f"Display name: {catalog.display_name}")
            print(
                f"Ingestion product type: {catalog.product_level_config.ingestion_product_type}"
            )
            print(
                f"Merchant Center Product ID: {catalog.product_level_config.merchant_center_product_id_field}"
            )
            print("---")

    except NotFound as e:
        print(
            f"Error: The specified parent resource was not found: {parent}. Details: {e}"
        )
        print(
            "Please ensure the project ID and location are correct and the Retail API is enabled."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project settings and network connection.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_list_catalogs]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all retail catalogs for a given project and location."
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
        default="global",  # Or a regional location like "us-central1"
        help="The Google Cloud location (e.g., 'global' or 'us-central1').",
    )
    args = parser.parse_args()

    list_catalogs(args.project_id, args.location)
