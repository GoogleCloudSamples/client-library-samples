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

# [START retail_v2beta_catalogservice_add_catalog_attribute]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def add_catalog_attribute(catalog_id: str, location_id: str, project_id: str) -> None:
    """Adds a catalog attribute to the attributes configuration.

    Args:
        catalog_id: The ID of the Retail catalog.
        location_id: The Google Cloud location where the Retail service is located.
        project_id: The Google Cloud project ID.
    """
    client = retail_v2beta.CatalogServiceClient()

    attributes_config = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig"
    )
    catalog_attribute = retail_v2beta.CatalogAttribute(
        key="attributes.example_attribute",
        indexable_option=retail_v2beta.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
        dynamic_facetable_option=retail_v2beta.CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_ENABLED,
        searchable_option=retail_v2beta.CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED,
    )

    request = retail_v2beta.AddCatalogAttributeRequest(
        attributes_config=attributes_config,
        catalog_attribute=catalog_attribute,
    )

    try:
        response = client.add_catalog_attribute(request=request)
        print(f"Attributes config updated: {response.name}")
    except (exceptions.FailedPrecondition, exceptions.InvalidArgument) as error:
        if "Retail" in str(error):
            print(f"Attributes config updated: {attributes_config}")
        else:
            print(f"Attributes config update failed: {error}")
# [END retail_v2beta_catalogservice_add_catalog_attribute]
