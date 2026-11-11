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

# [START vision_v1_productsearch_productset_create]
from google.api_core import exceptions
from google.cloud import vision_v1


def create_product_set(project_id: str, loc_id: str) -> None:
    """Creates a product set in Google Cloud Vision Product Search.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        loc_id: The location identifier (for example, 'us-west1').
    """
    client = vision_v1.ProductSearchClient()

    parent = f"projects/{project_id}/locations/{loc_id}"
    product_set = vision_v1.ProductSet(display_name="example-product-set")

    try:
        response = client.create_product_set(
            parent=parent,
            product_set=product_set,
        )
        print(f"Created product set: {response.name}")
    except exceptions.BadRequest as exc:
        if "doesn't onboard new projects" in str(exc):
            print(
                "Product Search does not onboard new projects. Use Vision Warehouse instead."
            )
        else:
            print(f"Request invalid: {exc}")
    except exceptions.AlreadyExists as exc:
        print(f"Product set already exists: {exc}")


# [END vision_v1_productsearch_productset_create]
