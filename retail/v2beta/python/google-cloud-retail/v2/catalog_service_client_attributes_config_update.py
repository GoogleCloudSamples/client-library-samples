# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START retail_v2beta_catalogservice_attributesconfig_update]
from google.api_core import exceptions as google_api_exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Updates the AttributesConfig.

    The catalog attributes in the request will be updated in the catalog, or
    inserted if they do not exist. Existing catalog attributes not included in
    the request will remain unchanged. Attributes that are assigned to products,
    but do not exist at the catalog level, are always included in the response.
    The product attribute is assigned default values for missing catalog
    attribute fields, e.g., searchable and dynamic facetable options.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location/region code.
        catalog_id: The ID of the catalog to update.
    """

    client = retail_v2beta.CatalogServiceClient()

    attributes_config_name = client.attributes_config_path(
        project_id, location, catalog_id
    )

    # Prepare the CatalogAttribute to update.
    catalog_attribute = retail_v2beta.CatalogAttribute(
        key="colors",
        searchable_option=retail_v2beta.CatalogAttribute.SearchableOption.SEARCHABLE_DISABLED,
        indexable_option=retail_v2beta.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
        dynamic_facetable_option=retail_v2beta.CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_ENABLED,
    )

    # Create an AttributesConfig object.
    # Only the `catalog_attributes` field can be updated directly via this method.
    attributes_config = retail_v2beta.AttributesConfig(
        name=attributes_config_name,
        catalog_attributes={catalog_attribute.key: catalog_attribute},
    )

    # Create a FieldMask to specify that only the `catalog_attributes` field should be updated.
    # This is crucial for partial updates to avoid unintended changes to other fields.
    update_mask = field_mask_pb2.FieldMask(paths=["catalog_attributes"])

    request = retail_v2beta.UpdateAttributesConfigRequest(
        attributes_config=attributes_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_attributes_config(request=request)
        print("Updated attributes config successfully:")
        print(response)

    except google_api_exceptions.NotFound as e:
        print(
            f"Error: AttributesConfig for catalog '{catalog_id}' not found. "
            f"Please ensure the catalog and attributes config exist. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_catalogservice_attributesconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Catalog AttributesConfig in Retail API."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The retail location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to update.",
    )
    args = parser.parse_args()

    update_attributes_config(args.project_id, args.location, args.catalog_id)
