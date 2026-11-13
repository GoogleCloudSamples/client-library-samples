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

# [START retail_v2_catalogservice_catalog_update]
import google.api_core.exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_catalog(project_id: str, location_id: str, catalog_id: str) -> None:
    """Updates the product level configuration of a Retail catalog.

    Args:
        project_id: The Google Cloud project ID hosting the Retail catalog.
        location_id: The geographic location of the catalog, typically 'global'.
        catalog_id: The catalog identifier, typically 'default_catalog'.
    """
    client = retail_v2.CatalogServiceClient()

    catalog = retail_v2.Catalog(
        name=f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}",
        product_level_config=retail_v2.ProductLevelConfig(
            ingestion_product_type="primary",
            merchant_center_product_id_field="offerId",
        ),
    )
    update_mask = field_mask_pb2.FieldMask(paths=["product_level_config"])

    try:
        response = client.update_catalog(
            catalog=catalog,
            update_mask=update_mask,
        )
        print(f"Updated catalog: {response.name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as error:
        print(f"Catalog update precondition not met: {error.message}")
# [END retail_v2_catalogservice_catalog_update]
