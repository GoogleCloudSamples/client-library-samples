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

# [START retail_v2alpha_productservice_products_list]
from google.api_core.exceptions import NotFound, PermissionDenied
from google.cloud import retail_v2alpha


def list_products(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
) -> None:
    """
    Lists products under a specific branch in the Retail catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        branch_id: The ID of the branch (e.g., "default_branch" or "0").
    """
    client = retail_v2alpha.ProductServiceClient()

    # The parent branch resource name
    parent = client.branch_path(project_id, location, catalog_id, branch_id)

    try:
        # Construct the request.
        # Setting page_size to a small number for demonstration purposes.
        # In a real application, you might use a larger page_size or rely on the default.
        request = retail_v2alpha.ListProductsRequest(
            parent=parent,
            page_size=10,  # Example: request 10 products per page
            require_total_size=True,  # Set to True to get the total count of matched items
        )

        print(f"Listing products under parent: {parent}")

        page_result = client.list_products(request=request)

        product_count = 0
        for product in page_result:
            product_count += 1
            print(f"  Product name: {product.name}")
            print(f"  Product title: {product.title}")
            print(f"  Product ID: {product.id}")
            print(f"  Product URI: {product.uri}")
            if product.price_info:
                print(f"  Product price: {product.price_info.price}")
            print("\n")

        print(f"Total products listed: {product_count}")
        if page_result.total_size is not None:
            print(
                f"Total products matching query (across all pages): {page_result.total_size}"
            )

    except NotFound as e:
        print(f"Error: The specified parent branch '{parent}' was not found.")
        print(
            f"Please ensure the project ID, location, catalog ID, and branch ID are correct."
        )
        print(f"Details: {e}")
    except PermissionDenied as e:
        print(f"Error: Permission denied to access branch '{parent}'.")
        print(
            f"Please ensure your service account has the necessary permissions (e.g., Retail Viewer)."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_productservice_products_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists products in a Google Cloud Retail catalog branch."
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
        help="The ID of the branch (e.g., 'default_branch' or '0').",
    )

    args = parser.parse_args()

    list_products(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
    )
