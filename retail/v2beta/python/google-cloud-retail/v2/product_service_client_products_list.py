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

# [START retail_v2beta_productservice_products_list]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def list_products(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
) -> None:
    """
    Lists all products under a specified branch in a catalog.

    The Retail API organizes product data hierarchically: Projects > Locations >
    Catalogs > Branches > Products. This method demonstrates how to retrieve a
    paginated list of products from a given branch. It's commonly used to
    verify product ingestion or to retrieve product details for other operations.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
        branch_id: The ID of the branch (e.g., 'default_branch').
                   Use 'default_branch' to list products under the default branch.
    """
    client = retail_v2beta.ProductServiceClient()

    # The parent branch resource name
    parent = client.branch_path(project_id, location, catalog_id, branch_id)

    request = retail_v2beta.ListProductsRequest(
        parent=parent,
        page_size=10,  # Limit to 10 products per page for demonstration
    )
    try:
        product_count = 0
        for product in client.list_products(request=request):
            product_count += 1
            print(f"  Product name: {product.name}")
            print(f"  Product title: {product.title}")
            print(f"  Product URI: {product.uri}")
            print("---")

        if product_count == 0:
            print("No products found for the specified branch.")
        else:
            print(f"Successfully listed {product_count} products.")

    except exceptions.NotFound as e:
        print(f"Error: The specified parent resource was not found: {parent}. ")
        print(
            f"Please ensure the project ID, location, catalog ID, and branch ID are correct. Details: {e}"
        )
    except exceptions.PermissionDenied as e:
        print(f"Error: Permission denied to access products under {parent}. ")
        print(
            f"Please ensure the service account has 'Retail Editor' or 'Retail Admin' roles. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_productservice_products_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List products in a Retail catalog branch."
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
        default="global",
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The ID of the branch (e.g., 'default_branch').",
    )

    args = parser.parse_args()

    list_products(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
    )
