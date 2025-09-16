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

# [START retail_v2_product_create]
from google.api_core import exceptions as core_exceptions
from google.cloud import retail_v2
from google.protobuf import wrappers_pb2


def create_retail_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Creates a product in the Retail catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        branch_id: The ID of the branch (e.g., "default_branch").
        product_id: The ID to use for the product.
    """
    client = retail_v2.ProductServiceClient()

    parent = client.branch_path(project_id, location, catalog_id, branch_id)

    product = retail_v2.Product(
        id=product_id,
        title="Test Product Title",
        brands=["Google"],
        categories=["Apparel"],
        price_info=retail_v2.PriceInfo(
            price=100.0,
            original_price=120.0,
            currency_code="USD",
        ),
        available_quantity=wrappers_pb2.Int32Value(value=10),
        uri="https://example.com/test-product",
        images=[
            retail_v2.Image(uri="https://example.com/image.jpg", width=300, height=300)
        ],
    )

    request = retail_v2.CreateProductRequest(
        parent=parent,
        product=product,
        product_id=product_id,
    )

    try:
        response = client.create_product(request=request)
        print("Product created successfully:")
        print(f"  Name: {response.name}")
        print(f"  ID: {response.id}")
        print(f"  Title: {response.title}")
        print(
            f"  Price: {response.price_info.price} {response.price_info.currency_code}"
        )
    except core_exceptions.AlreadyExists as e:
        print(f"Error: Product '{product_id}' already exists under '{parent}'.")
        print(
            "Please try a different product ID or consider updating the existing product."
        )
        print(f"Details: {e}")
    except core_exceptions.NotFound as e:
        print(
            f"Error: Parent branch '{parent}' not found. Please ensure the project, location, catalog, and branch are correct."
        )
        print(f"Details: {e}")


# [END retail_v2_product_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a product in Google Cloud Retail."
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
        help="The location of the catalog (e.g., 'global' or 'us-central1').",
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
    parser.add_argument(
        "--product_id",
        type=str,
        required=True,
        help="The ID to use for the product. Must be unique within the branch.",
    )

    args = parser.parse_args()

    create_retail_product(
        args.project_id,
        args.location,
        args.catalog_id,
        args.branch_id,
        args.product_id,
    )
