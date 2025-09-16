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

# [START retail_v2_productservice_product_delete]
from google.api_core import exceptions
from google.cloud import retail_v2


def delete_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Deletes a product from the Retail product catalog.

    This method deletes a product and all its associated inventory information.
    It's important to note that deleting a product is a permanent operation.
    If the product does not exist, a NOT_FOUND error is returned.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., 'global').
        catalog_id: The ID of the catalog.
        branch_id: The ID of the branch (e.g., 'default_branch').
        product_id: The ID of the product to delete.
    """

    client = retail_v2.ProductServiceClient()

    name = client.product_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
        product=product_id,
    )

    try:
        client.delete_product(name=name)
        print(f"Product {product_id} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Product {product_id} not found. It might have already been deleted or never existed."
        )
    except exceptions.InvalidArgument as e:
        print(f"Invalid argument provided for deleting product {product_id}: {e}")
        print(
            "Please ensure the product name format is correct and the product is"
            "not a collection member or a primary product with variants."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_productservice_product_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Delete a product from Retail catalog."
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
        help="The Google Cloud location (e.g., 'global').",
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
        help="The ID of the product to delete.",
    )

    args = parser.parse_args()

    delete_product(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
        product_id=args.product_id,
    )
