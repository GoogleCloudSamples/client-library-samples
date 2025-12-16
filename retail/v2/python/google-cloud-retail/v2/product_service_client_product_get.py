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

# [START retail_v2_productservice_get_product]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Retrieves a specific product from the Retail API.

    This method demonstrates how to fetch product details using its full resource name.
    It's useful for verifying product ingestion or retrieving specific product attributes.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global', 'us-central1').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
        branch_id: The ID of the branch (e.g., 'default_branch').
        product_id: The ID of the product to retrieve.
    """
    client = retail_v2.ProductServiceClient()

    product_name = client.product_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
        product=product_id,
    )

    print(f"Getting product: {product_name}")

    try:
        product = client.get_product(name=product_name)

        print("Successfully retrieved product:")
        print(f"  Product Name: {product.name}")
        print(f"  Product ID: {product.id}")
        print(f"  Title: {product.title}")
        print(f"  URI: {product.uri}")
        if product.price_info:
            print(f"  Price: {product.price_info.price}")
            print(f"  Original Price: {product.price_info.original_price}")
        if product.categories:
            print(f"  Categories: {', '.join(product.categories)}")
        if product.brands:
            print(f"  Brands: {', '.join(product.brands)}")

    except exceptions.NotFound:
        print(
            f"Error: Product '{product_name}' not found. Please ensure the product exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_productservice_get_product]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific product from the Retail API."
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
        help="The retail location.",
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
        help="The ID of the branch.",
    )
    parser.add_argument(
        "--product_id",
        type=str,
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
