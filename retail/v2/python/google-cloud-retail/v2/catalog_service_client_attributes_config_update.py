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

# [START retail_v2_catalogservice_attributesconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Updates the AttributesConfig for a catalog by modifying specific catalog attributes.

    The `update_attributes_config` method allows you to update the configuration
    of attributes at the catalog level. This includes settings like whether an
    attribute is indexable, dynamic facetable, or searchable.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to update (e.g., "default_catalog").
    """
    client = retail_v2.CatalogServiceClient()

    # The full resource name of the AttributesConfig.
    attributes_config_name = client.attributes_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    # Define the catalog attributes to update.
    # Only the attributes specified in this map will be updated or inserted.
    # Existing attributes not included here will remain unchanged.
    updated_catalog_attributes = {
        "colors": retail_v2.CatalogAttribute(
            key="colors",
            indexable_option=retail_v2.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
            dynamic_facetable_option=retail_v2.CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_ENABLED,
            retrievable_option=retail_v2.CatalogAttribute.RetrievableOption.RETRIEVABLE_ENABLED,
            exact_searchable_option=retail_v2.CatalogAttribute.ExactSearchableOption.EXACT_SEARCHABLE_DISABLED,
            searchable_option=retail_v2.CatalogAttribute.SearchableOption.SEARCHABLE_DISABLED,
        ),
        "sizes": retail_v2.CatalogAttribute(
            key="sizes",
            indexable_option=retail_v2.CatalogAttribute.IndexableOption.INDEXABLE_ENABLED,
            dynamic_facetable_option=retail_v2.CatalogAttribute.DynamicFacetableOption.DYNAMIC_FACETABLE_DISABLED,
            retrievable_option=retail_v2.CatalogAttribute.RetrievableOption.RETRIEVABLE_ENABLED,
            searchable_option=retail_v2.CatalogAttribute.SearchableOption.SEARCHABLE_ENABLED,
        ),
    }

    # Create the AttributesConfig object with the updated attributes.
    # The 'name' field is required to identify which AttributesConfig to update.
    attributes_config_to_update = retail_v2.AttributesConfig(
        name=attributes_config_name,
        catalog_attributes=updated_catalog_attributes,
    )

    # Create a FieldMask to specify which fields of AttributesConfig are being updated.
    # Currently, 'catalog_attributes' is the only supported field for update.
    update_mask = field_mask_pb2.FieldMask(paths=["catalog_attributes"])

    request = retail_v2.UpdateAttributesConfigRequest(
        attributes_config=attributes_config_to_update,
        update_mask=update_mask,
    )

    try:
        response = client.update_attributes_config(request=request)
        print("Attributes config updated successfully:")
        print(f"  Name: {response.name}")
        print("  Catalog Attributes:")
        for key, attr in response.catalog_attributes.items():
            print(f"    Key: {key}")
            print(f"      Indexable: {attr.indexable_option.name}")
            print(f"      Dynamic Facetable: {attr.dynamic_facetable_option.name}")
            print(f"      Searchable: {attr.searchable_option.name}")
            print(f"      Retrievable: {attr.retrievable_option.name}")
            print(f"      Exact Searchable: {attr.exact_searchable_option.name}")
    except exceptions.NotFound as e:
        print(f"Error: The specified catalog or attributes config was not found: {e}")
        print("Please ensure the project ID, location, and catalog ID are correct.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for updating attributes config: {e}")
        print(
            "Please check the request parameters, especially the attribute keys and options."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check your network connection, project permissions, and API quotas."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_catalogservice_attributesconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update attributes config for a Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
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
        help="The ID of the catalog to update (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    update_attributes_config(args.project_id, args.location, args.catalog_id)
