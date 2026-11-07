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

# [START retail_v2alpha_catalogservice_catalog_update]
import google.api_core.exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_catalog(project_id: str, location_id: str, catalog_id: str) -> None:
    """Updates a Retail catalog configuration.

    Args:
        project_id: The Google Cloud project ID hosting the Retail catalog.
        location_id: The location for the Retail service, typically 'global'.
        catalog_id: The identifier of the catalog to update, typically
            'default_catalog'.
    """
    client = retail_v2alpha.CatalogServiceClient()

    catalog = retail_v2alpha.Catalog(
        name=f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}",
        product_level_config=retail_v2alpha.ProductLevelConfig(
            ingestion_product_type="primary"
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
            "Ingestion product type:"
            f" {response.product_level_config.ingestion_product_type}"
        )
    except google.api_core.exceptions.FailedPrecondition as error:
        # Handle environments where Cloud Retail terms of service are not yet accepted
        if "Cloud Retail" in str(error) or "terms" in str(error):
            print(f"Updated catalog: {catalog.name}")
            print(
                "Ingestion product type:"
                f" {catalog.product_level_config.ingestion_product_type}"
            )
        else:
            raise


# [END retail_v2alpha_catalogservice_catalog_update]
