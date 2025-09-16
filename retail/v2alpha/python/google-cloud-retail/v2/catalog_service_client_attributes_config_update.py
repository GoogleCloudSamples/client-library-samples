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

# [START retail_v2alpha_catalogservice_attributesconfig_update]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Updates the AttributesConfig for a given catalog.

    This method demonstrates how to update the catalog-level attribute configurations,
    such as making a custom attribute indexable or searchable. The `update_mask`
    is crucial here to specify which parts of the `AttributesConfig` are being modified.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog.
        catalog_id: The ID of the catalog to update.
    """

    client = retail_v2alpha.CatalogServiceClient()

    attributes_config_name = client.attributes_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    # Define a custom attribute to update or add.
    # For this example, we'll configure 'color_family' to be indexable and searchable.
    # Note: Custom attributes typically start with 'attributes.' prefix.
    custom_attribute_key = "attributes.color_family"
    catalog_attribute = retail_v2alpha.types.CatalogAttribute(
        key=custom_attribute_key,
        indexable_option=retail_v2alpha.types.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
        searchable_option=retail_v2alpha.types.CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED,
        dynamic_facetable_option=retail_v2alpha.types.CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_ENABLED,
        # You can also set exact_searchable_option, retrievable_option here
    )

    # Create an AttributesConfig object with the attribute(s) to update.
    # The 'name' field is required for the update operation.
    attributes_config = retail_v2alpha.types.AttributesConfig(
        name=attributes_config_name,
        catalog_attributes={custom_attribute_key: catalog_attribute},
    )

    # Specify which fields of the AttributesConfig are being updated.
    # For updating catalog_attributes, the update_mask should include "catalog_attributes".
    update_mask = field_mask_pb2.FieldMask(paths=["catalog_attributes"])

    request = retail_v2alpha.types.UpdateAttributesConfigRequest(
        attributes_config=attributes_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_attributes_config(request=request)

        print("Attributes config updated successfully:")
        print(f"  Name: {response.name}")
        print(f"  Attribute config level: {response.attribute_config_level}")
        print("  Updated catalog attributes:")
        for key, attr in response.catalog_attributes.items():
            print(f"    Key: {key}")
            print(f"      Indexable: {attr.indexable_option}")
            print(f"      Searchable: {attr.searchable_option}")
            print(f"      In use: {attr.in_use}")
            print(f"      Type: {attr.type}")

    except NotFound as e:
        print(f"Error: The specified attributes config was not found: {e}")
        print("Please ensure the project ID, location, and catalog ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_catalogservice_attributesconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update catalog attributes configuration."
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
        help="The location of the catalog (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to update.",
    )

    args = parser.parse_args()

    update_attributes_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
    )
