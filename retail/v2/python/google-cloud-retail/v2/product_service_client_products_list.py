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

# [START retail_v2_productservice_products_list]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_products(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
) -> None:
    """
    Lists all products in a specific branch of a catalog.

    This method demonstrates how to retrieve a paginated list of products
    from the Retail API. It's useful for auditing inventory or performing
    bulk operations on products.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global').
        catalog_id: The ID of the catalog to list products from (e.g., 'default_catalog').
        branch_id: The ID of the branch to list products from (e.g., 'default_branch').
    """
    client = retail_v2.ProductServiceClient()

    parent = client.branch_path(project_id, location, catalog_id, branch_id)

    request = retail_v2.ListProductsRequest(parent=parent)

    try:
        page_result = client.list_products(request=request)

        product_count = 0
        for product in page_result:
            product_count += 1
            print(f"Product name: {product.name}")
            print(f"Product title: {product.title}")
            print(f"Product URI: {product.uri}")
            print("-------------------------------------")

        if product_count == 0:
            print("No products found for the specified parent.")
        else:
            print(f"Successfully listed {product_count} products.")

    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Please ensure the service account has the necessary permissions. Details: {e}"
        )
        print(f"Parent resource: {parent}")
    except exceptions.NotFound as e:
        print(
            f"Error: Resource not found. Please check if the catalog or branch exists. Details: {e}"
        )
        print(f"Parent resource: {parent}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(f"Parent resource: {parent}")


# [END retail_v2_productservice_products_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List products in a Google Cloud Retail catalog branch."
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
        help="The ID of the catalog to list products from",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The ID of the branch to list products from",
    )

    args = parser.parse_args()

    list_products(
        args.project_id,
        args.location,
        args.catalog_id,
        args.branch_id,
    )
