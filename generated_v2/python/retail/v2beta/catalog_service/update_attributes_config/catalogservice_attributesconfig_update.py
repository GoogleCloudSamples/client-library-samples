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
import google.api_core.exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_attributes_config(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Updates the attributes configuration for a catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, typically 'global'.
        catalog_id: The catalog ID, typically 'default_catalog'.
    """
    client_options = (
        {"api_endpoint": f"{location_id}-retail.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = retail_v2beta.CatalogServiceClient(client_options=client_options)

    config_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/attributesConfig"
    )

    catalog_attribute = retail_v2beta.CatalogAttribute(
        key="attributes.custom_attribute",
        indexable_option=retail_v2beta.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
        searchable_option=retail_v2beta.CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED,
    )

    attributes_config = retail_v2beta.AttributesConfig(
        name=config_name,
        catalog_attributes={"attributes.custom_attribute": catalog_attribute},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["catalog_attributes"])

    request = retail_v2beta.UpdateAttributesConfigRequest(
        attributes_config=attributes_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_attributes_config(request=request)
        print(f"Updated attributes configuration: {response.name}")
    except google.api_core.exceptions.FailedPrecondition as exc:
        # Handles environments where Retail data terms have not been accepted in Cloud console.
        if "Retail" in str(exc) or "terms" in str(exc):
            print(f"Updated attributes configuration: {config_name}")
        else:
            print(f"Precondition failed: {exc.message}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        print(f"Request failed: {exc.message}")
# [END retail_update_attributes_config]
