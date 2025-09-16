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

# [START retail_v2beta_productservice_product_update]
from google.api_core import exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Updates a product in the Retail product catalog.

    This method demonstrates how to update specific fields of an existing product
    using a field mask. Only the fields specified in the `update_mask` will be
    modified. If a product with the given ID does not exist, a NOT_FOUND error
    will be returned.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global", "us-central1").
        catalog_id: The ID of the catalog to which the product belongs. (e.g. "default_catalog").
        branch_id: The ID of the branch to which the product belongs (e.g., "default_branch").
        product_id: The ID of the product to update. This should correspond to
                    an existing product.
    """

    client = retail_v2beta.ProductServiceClient()

    # Construct the full resource name of the product.
    product_name = client.product_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
        product=product_id,
    )

    # Create a Product object with the updated information.
    # Only fields specified in the update_mask will be updated.
    # For example, updating the title and brands.
    updated_product = retail_v2beta.Product(
        name=product_name,
        title="Updated Product Title",
        brands=["Updated Brand 1", "Updated Brand 2"],
        # Add other fields you wish to update here, e.g.:
        # description="This is an updated description for the product.",
        # price_info=retail_v2beta.PriceInfo(
        #     price=12.99,
        #     original_price=15.00,
        #     currency_code="USD",
        # ),
    )

    # Create a FieldMask to specify which fields to update.
    # The paths should match the field names in the Product proto.
    update_mask = field_mask_pb2.FieldMask(paths=["title", "brands"])

    request = retail_v2beta.UpdateProductRequest(
        product=updated_product,
        update_mask=update_mask,
        # Set allow_missing to True if you want to create the product if it doesn't exist.
        # However, for a pure update sample, we assume the product exists.
        # allow_missing=False,
    )

    print(f"Updating product: {product_name} with fields: {update_mask.paths}")

    try:
        response = client.update_product(request=request)

        print("Product updated successfully:")
        print(f"  Product Name: {response.name}")
        print(f"  Product Title: {response.title}")
        print(f"  Product Brands: {response.brands}")
    except exceptions.NotFound as e:
        print(
            f"Error: Product '{product_name}' not found. "
            "Please ensure the product exists before attempting to update it. "
            f"Details: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while updating product '{product_name}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_productservice_product_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a product in the Retail product catalog."
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
        help="The Google Cloud location (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the product belongs.",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The ID of the branch to which the product belongs (e.g., 'default_branch').",
    )
    parser.add_argument(
        "--product_id",
        type=str,
        required=True,
        help="The ID of the product to update.",
    )
    args = parser.parse_args()

    update_product(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
        product_id=args.product_id,
    )
