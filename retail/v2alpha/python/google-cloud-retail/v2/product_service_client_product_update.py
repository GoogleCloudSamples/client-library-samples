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

# [START retail_v2alpha_productservice_product_update]
from google.api_core import exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_product(
    project_id: str,
    location: str,
    product_id: str,
    branch_id: str = "default_branch",
) -> None:
    """
    Updates a product in the Retail catalog.

    This method demonstrates how to update specific fields of an existing product.
    It's useful for modifying product details like title, brands, or other attributes.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the Retail catalog (e.g., "global").
        product_id: The ID of the product to update.
        branch_id: The branch ID of the product. Defaults to "default_branch".
    """
    client = retail_v2alpha.ProductServiceClient()

    # Construct the product name from the provided arguments.
    product_name = client.product_path(
        project=project_id,
        location=location,
        catalog="default_catalog",
        branch=branch_id,
        product=product_id,
    )

    # Create a Product object with the updated fields.
    # Only fields specified in the update_mask will be updated.
    # For this example, we update the title and add a new brand.
    updated_product = retail_v2alpha.Product(
        name=product_name,
        title="Updated Product Title",
        brands=["Updated Brand", "New Brand"],
        # You can update other fields like description, price_info, etc.
        # For example:
        #   description="This is an updated description for the product.",
        #   price_info=retail_v2alpha.PriceInfo(price=25.0, original_price=30.0),
    )

    # Create an update mask to specify which fields to update.
    # If update_mask is not set, all supported fields are updated.
    # We explicitly list the fields we want to change.
    update_mask = field_mask_pb2.FieldMask(paths=["title", "brands"])

    request = retail_v2alpha.UpdateProductRequest(
        product=updated_product,
        update_mask=update_mask,
        # Set allow_missing to True if you want to create the product if it doesn't exist.
        # However, for an update operation, it's typically expected the product already exists.
        # allow_missing=True,
    )

    try:
        response = client.update_product(request=request)
        print("Product updated successfully:")
        print(f"  Name: {response.name}")
        print(f"  Title: {response.title}")
        print(f"  Brands: {response.brands}")
    except exceptions.NotFound as e:
        print(
            f"Error: Product '{product_name}' not found. Please ensure the product exists before updating.\nDetails: {e}"
        )
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for product update.\nDetails: {e}")
        print("Please check the product name format, product fields, and update mask.")
    except Exception as e:
        print(f"An unexpected error occurred during product update: {e}")


# [END retail_v2alpha_productservice_product_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a product in the Retail catalog."
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
        help="The location of the Retail catalog.",
    )
    parser.add_argument(
        "--product_id",
        type=str,
        required=True,
        help="The ID of the product to update.",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The branch ID of the product. Defaults to 'default_branch'.",
    )

    args = parser.parse_args()

    update_product(
        project_id=args.project_id,
        location=args.location,
        product_id=args.product_id,
        branch_id=args.branch_id,
    )
