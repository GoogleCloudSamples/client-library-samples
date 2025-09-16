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

# [START retail_v2_catalogservice_attributesconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2


def get_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Retrieves the AttributesConfig for a given catalog.

    The AttributesConfig defines how product attributes are handled for indexing,
    faceting, and searching within the Retail API. This method allows you to
    inspect the current configuration for a specific catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to retrieve the attributes config for.
    """
    client = retail_v2.CatalogServiceClient()

    name = client.attributes_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    request = retail_v2.GetAttributesConfigRequest(name=name)

    try:
        print(f"Getting attributes config for catalog: {catalog_id}")
        attributes_config = client.get_attributes_config(request=request)

        print("Retrieved AttributesConfig:")
        print(f"  Name: {attributes_config.name}")
        print(f"  Attribute Config Level: {attributes_config.attribute_config_level}")
        print("  Catalog Attributes:")
        if attributes_config.catalog_attributes:
            for key, attr in attributes_config.catalog_attributes.items():
                print(f"    Key: {key}")
                print(f"      In Use: {attr.in_use}")
                print(f"      Type: {attr.type.name}")
                print(f"      Indexable Option: {attr.indexable_option.name}")
                print(
                    f"      Dynamic Facetable Option: {attr.dynamic_facetable_option.name}"
                )
                print(f"      Searchable Option: {attr.searchable_option.name}")
                print(
                    f"      Exact Searchable Option: {attr.exact_searchable_option.name}"
                )
                print(f"      Retrievable Option: {attr.retrievable_option.name}")
        else:
            print("    No custom catalog attributes configured.")

    except NotFound:
        print(f"AttributesConfig for catalog '{catalog_id}' not found.")
        print(
            "Please ensure the catalog ID is correct and the AttributesConfig exists."
        )
    except Exception as e:
        print(f"Error getting attributes config: {e}")


# [END retail_v2_catalogservice_attributesconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the AttributesConfig for a Google Cloud Retail catalog."
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
        help="The ID of the catalog to retrieve the attributes config for.",
    )

    args = parser.parse_args()

    get_attributes_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
    )
