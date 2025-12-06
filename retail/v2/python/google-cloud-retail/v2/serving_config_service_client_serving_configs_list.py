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

# [START retail_v2_servingconfigservice_servingconfigs_list]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_serving_configs(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """Lists all ServingConfigs linked to a catalog.

    ServingConfigs are used to configure the behavior of retail solutions like
    search and recommendations. This sample demonstrates how to retrieve a list
    of existing ServingConfigs for a given catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global', 'us-central1').
        catalog_id: The ID of the catalog to list serving configs from.
    """
    client = retail_v2.ServingConfigServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    print(f"Listing Serving Configs for catalog: {parent}")

    try:
        page_result = client.list_serving_configs(parent=parent)

        found_serving_configs = False
        for serving_config in page_result:
            found_serving_configs = True
            print(f"Serving Config: {serving_config.name}")
            print(f"  Display Name: {serving_config.display_name}")
            print(f"  Solution Types: {serving_config.solution_types}")
            print(f"  Diversity Level: {serving_config.diversity_level}")
            print("---")

        if not found_serving_configs:
            print(f"No Serving Configs found for catalog: {parent}")
        else:
            print(f"Successfully listed Serving Configs for catalog: {parent}")

    except exceptions.NotFound as e:
        print(f"Error: The specified parent catalog was not found: {parent}.")
        print("Please ensure the project ID, location, and catalog ID are correct.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_servingconfigservice_servingconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists ServingConfigs for a Google Cloud Retail catalog."
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
        help="The retail location (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to list serving configs from.",
    )

    args = parser.parse_args()

    list_serving_configs(
        args.project_id,
        args.location,
        args.catalog_id,
    )
