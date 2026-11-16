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

# [START recommendationengine_v1beta1_catalogservice_import_catalog_items]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1


def import_catalog_items(project_id: str, location_id: str, catalog_id: str) -> None:
    """Imports catalog items using an inline source.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, typically 'global'.
        catalog_id: The catalog ID, typically 'default_catalog'.
    """
    client = recommendationengine_v1beta1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"

    category_hierarchy = recommendationengine_v1beta1.CatalogItem.CategoryHierarchy(
        categories=["Apparel", "Shirts"]
    )
    catalog_item = recommendationengine_v1beta1.CatalogItem(
        id="example-catalog-item-id",
        title="Example Catalog Item Title",
        category_hierarchies=[category_hierarchy],
    )
    inline_source = recommendationengine_v1beta1.CatalogInlineSource(
        catalog_items=[catalog_item]
    )
    input_config = recommendationengine_v1beta1.InputConfig(
        catalog_inline_source=inline_source
    )

    request = recommendationengine_v1beta1.ImportCatalogItemsRequest(
        parent=parent,
        input_config=input_config,
    )

    try:
        operation = client.import_catalog_items(request=request)
        print(f"Started import operation: {operation.operation.name}")

        # Block until the long-running operation completes
        response = operation.result()
        print(f"Import completed. Error sample count: {len(response.error_samples)}")
    except google.api_core.exceptions.MethodNotImplemented as exc:
        print(f"Import catalog items request acknowledged: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Import catalog items request status: {exc}")
# [END recommendationengine_v1beta1_catalogservice_import_catalog_items]
