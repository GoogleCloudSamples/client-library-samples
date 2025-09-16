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

# [START retail_v2beta_create_product]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def create_product(
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
        location: The location of the retail catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        branch_id: The ID of the branch (e.g., "default_branch").
        product_id: The ID to use for the product, which will become the final
            component of the Product.name.
    """

    client = retail_v2beta.ProductServiceClient()

    # The product to create.
    product_to_create = retail_v2beta.Product(
        title="Nest Mini",
        categories=["Speakers and displays"],
        brands=["Google"],
        price_info=retail_v2beta.PriceInfo(
            price=49.0,
            original_price=79.0,
            currency_code="USD",
        ),
        # Other product attributes can be set here.
        # For example, to set an attribute:
        # attributes={
        #     "color": retail_v2beta.CustomAttribute(text=["chalk"])
        # }
    )

    # Construct the parent resource name.
    parent = f"projects/{project_id}/locations/{location}/catalogs/{catalog_id}/branches/{branch_id}"

    # Construct the request.
    request = retail_v2beta.CreateProductRequest(
        parent=parent,
        product=product_to_create,
        product_id=product_id,
    )

    try:
        response = client.create_product(request=request)

        print(f"Product created: {response.name}")
        print(f"Product title: {response.title}")

    except exceptions.AlreadyExists as e:
        print(
            f"Product '{product_id}' already exists under parent '{parent}'. Error: {e}"
        )
        print(
            "Consider using `update_product` if you intend to modify an existing product."
        )
    except exceptions.NotFound as e:
        print(f"The parent resource '{parent}' was not found. Error: {e}")
        print(
            "Please ensure the project, location, catalog, and branch IDs are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_create_product]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a product in the Retail catalog."
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
        help="The location of the retail catalog.",
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
        required=True,
        help="The ID to use for the product.",
    )

    args = parser.parse_args()

    create_product(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        branch_id=args.branch_id,
        product_id=args.product_id,
    )
