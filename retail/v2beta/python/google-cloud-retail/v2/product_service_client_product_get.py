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

# [START retail_v2beta_productservice_product_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2beta


def get_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Gets a product from the Retail API.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the retail catalog (e.g., "global").
        catalog_id: The ID of the catalog.
        branch_id: The ID of the branch (e.g., "default_branch").
        product_id: The ID of the product to retrieve.
    """
    client = retail_v2beta.ProductServiceClient()

    # Construct the full product resource name.
    product_name = client.product_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
        product=product_id,
    )

    request = retail_v2beta.GetProductRequest(name=product_name)

    try:
        product = client.get_product(request=request)
        print("Product retrieved successfully:")
        print(f"  Product Name: {product.name}")
        print(f"  Product ID: {product.id}")
        print(f"  Product Title: {product.title}")
        print(f"  Product URI: {product.uri}")
        print(f"  Product Price: {product.price_info.price}")
        print(f"  Product Availability: {product.availability.name}")
    except NotFound:
        print(f"Product {product_name} not found. Please ensure the product exists.")
    except GoogleAPICallError as e:
        print(f"Error getting product {product_name}: {e}")


# [END retail_v2beta_productservice_product_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a product from the Retail API.")
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
        help="The location of the retail catalog (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog.",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The ID of the branch (e.g., 'default_branch').",
    )
    parser.add_argument(
        "--product_id",
        type=str,
        required=True,
        help="The ID of the product to retrieve.",
    )

    args = parser.parse_args()

    get_product(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
        product_id=args.product_id,
    )
