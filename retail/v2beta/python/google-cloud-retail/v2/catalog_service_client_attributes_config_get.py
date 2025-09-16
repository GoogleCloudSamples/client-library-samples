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

# [START retail_v2beta_catalogservice_attributesconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def get_attributes_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Gets the AttributesConfig for a given catalog.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
    """
    client = retail_v2beta.CatalogServiceClient()

    # The resource name of the AttributesConfig to retrieve.
    name = client.attributes_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    try:
        request = retail_v2beta.GetAttributesConfigRequest(name=name)

        attributes_config = client.get_attributes_config(request=request)

        print(f"Retrieved AttributesConfig: {attributes_config.name}")
        print(
            f"  Attribute config level: {attributes_config.attribute_config_level.name}"
        )
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

    except exceptions.NotFound as e:
        print(
            f"Error: AttributesConfig not found for {name}. Please ensure the catalog ID is correct and the resource exists."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_catalogservice_attributesconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get AttributesConfig for a catalog.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
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
        help="The ID of the catalog (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    get_attributes_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
    )
