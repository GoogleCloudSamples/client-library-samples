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

# [START retail_v2_productservice_update_product]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Updates a product in the Retail API.

    This method demonstrates how to update an existing product's information,
    such as its title, description, or attributes. It uses a field mask to
    specify which fields of the product are being updated.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global', 'us-central1').
        catalog_id: The ID of the catalog.
        branch_id: The ID of the branch (e.g., 'default_branch').
        product_id: The ID of the product to update.
    """
    client = retail_v2.ProductServiceClient()

    product_name = client.product_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
        product=product_id,
    )

    # Prepare the product with updated fields
    # Only the fields specified in the update_mask will be updated.
    # Other fields in the product object will be ignored.
    updated_product = retail_v2.Product(
        name=product_name,  # Product name is required to identify the product
        title="Updated Product Title",
        description="This is an updated product description",
        brands=["Updated Brand"],
        categories=["Updated Category 1", "Updated Category 2"],
        # Example of updating custom attributes. The key 'color' and 'material'
        # must exist in the product's schema or be added as indexable attributes.
        attributes={
            "color": retail_v2.CustomAttribute(text=["red", "blue"]),
            "material": retail_v2.CustomAttribute(text=["cotton"]),
        },
    )

    # Create a field mask to specify which fields to update.
    # If update_mask is not set, all supported fields are updated.
    # For a partial update, explicitly list the fields to update.
    update_mask = field_mask_pb2.FieldMask(
        paths=[
            "title",
            "description",
            "brands",
            "categories",
            "attributes.color",
            "attributes.material",
        ]
    )

    request = retail_v2.UpdateProductRequest(
        product=updated_product,
        update_mask=update_mask,
        # If set to true, and the product is not found, a new product will be created.
        # This sample demonstrates updating an existing product, so we set it to False.
        allow_missing=False,
    )

    print(f"Updating product: {updated_product.name}")

    try:
        response = client.update_product(request=request)

        print(f"Product updated successfully: {response.name}")
        print(f"Updated Title: {response.title}")
        print(f"Updated Description: {response.description}")
        print(f"Updated Brands: {response.brands}")
        print(f"Updated Categories: {response.categories}")
        print(f"Updated Attributes: {response.attributes}")
    except exceptions.NotFound:
        print(
            f"Error: Product '{product_name}' not found. "
            "Please ensure the product exists before attempting to update it. "
            "Alternatively, set 'allow_missing=True' in the request to create it if it doesn't exist."
        )
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for product update: {e}")
        print(
            "Please check the product data and update mask for correctness, "
            "and ensure custom attributes are properly defined in the catalog schema."
        )
    except Exception as e:
        print(f"An unexpected error occurred during product update: {e}")


# [END retail_v2_productservice_update_product]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update a product in the Retail API.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The retail location (e.g., 'global', 'us-central1').",
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
        "--product_id", required=True, type=str, help="The ID of the product to update."
    )

    args = parser.parse_args()

    update_product(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
        product_id=args.product_id,
    )
