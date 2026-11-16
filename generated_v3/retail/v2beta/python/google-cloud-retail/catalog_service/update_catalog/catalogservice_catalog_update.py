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

# [START retail_v2beta_catalogservice_catalog_update]
from google.api_core import exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_catalog(project_id: str, location_id: str, catalog_id: str) -> None:
    """Updates a catalog configuration in Google Cloud Retail.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, typically 'global' for Google Cloud Retail.
        catalog_id: The ID of the catalog, typically 'default_catalog'.
    """
    client = retail_v2beta.CatalogServiceClient()

    catalog_path = client.catalog_path(project_id, location_id, catalog_id)

    catalog = retail_v2beta.Catalog(
        name=catalog_path,
        product_level_config=retail_v2beta.ProductLevelConfig(
            ingestion_product_type="primary",
        ),
    )
    update_mask = field_mask_pb2.FieldMask(paths=["product_level_config"])

    try:
        response = client.update_catalog(
            catalog=catalog,
            update_mask=update_mask,
        )
        print(f"Updated catalog: {response.name}")
        print(
            f"Ingestion product type: {response.product_level_config.ingestion_product_type}"
        )
    except (
        exceptions.FailedPrecondition,
        exceptions.InvalidArgument,
        exceptions.NotFound,
        exceptions.PermissionDenied,
    ) as exc:
        print(f"Catalog update status: {exc}")
# [END retail_v2beta_catalogservice_catalog_update]
