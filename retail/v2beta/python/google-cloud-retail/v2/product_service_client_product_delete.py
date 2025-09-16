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

# [START retail_v2beta_productservice_delete_product]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def delete_product(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
    product_id: str,
) -> None:
    """
    Deletes a product from the Retail catalog.

    The delete operation removes the product from the catalog. After deletion,
    the product will no longer be discoverable through search or recommendation
    APIs. It's important to note that the product to delete cannot be a
    COLLECTION product member or a PRIMARY product with more than one variants.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to which the product belongs. (e.g. "default_catalog").
        branch_id: The ID of the branch to which the product belongs (e.g., "default_branch").
        product_id: The ID of the product to delete. This is the user-defined
                    ID, not the full resource name.
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

    delete_request = retail_v2beta.DeleteProductRequest(name=product_name)

    try:
        client.delete_product(request=delete_request)
        print(f"Product {product_name} deleted successfully.")
    except exceptions.NotFound:
        print(f"Product {product_name} not found. It may have already been deleted.")
    except exceptions.PermissionDenied as e:
        print(f"Permission denied to delete product {product_name}. Error: {e}")
        print(
            "Please ensure the service account has the necessary permissions (e.g., "
            "'Retail Editor' or 'Retail Admin') for the project and product resource."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while deleting product {product_name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_productservice_delete_product]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Delete a product from the Retail catalog."
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
        help="The retail location (e.g., 'global').",
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
