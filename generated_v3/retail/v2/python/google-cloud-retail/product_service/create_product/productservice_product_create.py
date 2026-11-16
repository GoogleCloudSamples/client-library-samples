# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START retail_v2_productservice_product_create]
from google.api_core import exceptions
from google.cloud import retail_v2


def create_product(project_id: str, product_id: str, location_id: str) -> None:
    """Creates a product in the catalog branch.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        product_id: The unique identifier for the product (for example,
          'example-product-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client_options = {}
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-retail.googleapis.com"}
    client = retail_v2.ProductServiceClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/"
        "default_catalog/branches/default_branch"
    )
    product = retail_v2.Product(
        title="Sample Product",
        type_=retail_v2.Product.Type.PRIMARY,
        categories=["Apparel > Shirts"],
        description="Sample product description",
    )

    try:
        response = client.create_product(
            parent=parent,
            product=product,
            product_id=product_id,
        )
        print(f"Created product: {response.name}")
    except exceptions.AlreadyExists:
        print(f"Product '{product_id}' already exists.")
    except (exceptions.InvalidArgument, exceptions.FailedPrecondition) as exc:
        print(f"Product creation skipped: {exc}")
# [END retail_v2_productservice_product_create]
