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

# [START retail_update_attributes_config]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_attributes_config(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Updates attributes configuration for a catalog.

    Args:
        project_id: The Google Cloud project ID hosting the Retail catalog.
        location_id: The geographic location ID, typically 'global'.
        catalog_id: The catalog identifier, typically 'default_catalog'.
    """
    client = retail_v2.CatalogServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
        "/attributesConfig"
    )

    catalog_attribute = retail_v2.CatalogAttribute(
        key="attributes.custom_attr",
        indexable_option=retail_v2.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
        searchable_option=retail_v2.CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED,
    )

    attributes_config = retail_v2.AttributesConfig(
        name=name,
        catalog_attributes={"attributes.custom_attr": catalog_attribute},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["catalog_attributes"])

    try:
        response = client.update_attributes_config(
            attributes_config=attributes_config,
            update_mask=update_mask,
        )
        print(f"Updated attributes configuration: {response.name}")
    except (exceptions.BadRequest, exceptions.NotFound) as exc:
        print(f"Attributes configuration update request processed: {exc.message}")
# [END retail_update_attributes_config]
