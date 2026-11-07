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

# [START recommendationengine_v1beta1_catalogservice_catalogitem_create]
from google.api_core import exceptions
from google.cloud import recommendationengine_v1beta1


def create_catalog_item(project_id: str) -> None:
    """Creates a catalog item in the default catalog.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
    """
    client = recommendationengine_v1beta1.CatalogServiceClient()

    catalog_item = recommendationengine_v1beta1.CatalogItem(
        id="example-item-id",
        category_hierarchies=[
            recommendationengine_v1beta1.CatalogItem.CategoryHierarchy(
                categories=["Apparel", "Shoes"]
            )
        ],
        title="Example Product Title",
        language_code="en",
    )
    parent = f"projects/{project_id}/locations/global/catalogs/default_catalog"

    try:
        response = client.create_catalog_item(
            parent=parent,
            catalog_item=catalog_item,
        )
        print(f"Created catalog item: {response.id}")
    except exceptions.MethodNotImplemented as error:
        print(f"Catalog item creation is not supported for GA projects: {error}")
    except exceptions.AlreadyExists as error:
        print(f"Catalog item already exists: {error}")
    except exceptions.InvalidArgument as error:
        print(f"Invalid catalog item argument: {error}")
# [END recommendationengine_v1beta1_catalogservice_catalogitem_create]
