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

# [START retail_v2alpha_catalogservice_attributesconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2alpha


def get_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Gets the AttributesConfig for a given catalog.

    The AttributesConfig defines how product attributes are treated, such as
    whether they are indexable, searchable, or facetable.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
    """
    # Create a client
    client = retail_v2alpha.CatalogServiceClient()

    # The path of the AttributesConfig resource to retrieve.
    name = client.attributes_config_path(project_id, location, catalog_id)

    try:
        request = retail_v2alpha.GetAttributesConfigRequest(name=name)

        attributes_config = client.get_attributes_config(request=request)

        print(f"Attributes Config Name: {attributes_config.name}")
        print(f"Attribute Config Level: {attributes_config.attribute_config_level}")
        print("Catalog Attributes:")
        for key, attr in attributes_config.catalog_attributes.items():
            print(f"  Key: {key}")
            print(f"    Type: {attr.type}")
            print(f"    In Use: {attr.in_use}")
            print(f"    Indexable Option: {attr.indexable_option}")
            print(f"    Dynamic Facetable Option: {attr.dynamic_facetable_option}")
            print(f"    Searchable Option: {attr.searchable_option}")
            print(
                f"    Recommendations Filtering Option: {attr.recommendations_filtering_option}"
            )
            print(f"    Exact Searchable Option: {attr.exact_searchable_option}")
            print(f"    Retrievable Option: {attr.retrievable_option}")

    except NotFound as e:
        print(f"AttributesConfig not found for name {name}. Error: {e}")
        print("Please ensure the project, location, and catalog ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_catalogservice_attributesconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the AttributesConfig for a Retail catalog."
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
        help="The retail location (e.g., 'global'). Default is 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog'). Default is 'default_catalog'.",
    )
    args = parser.parse_args()

    get_attributes_config(args.project_id, args.location, args.catalog_id)
