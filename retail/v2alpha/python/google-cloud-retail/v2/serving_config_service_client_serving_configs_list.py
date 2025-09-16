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

# [START retail_v2alpha_servingconfigservice_servingconfigs_list]
from google.api_core import exceptions as core_exceptions
from google.cloud import retail_v2alpha


def list_serving_configs(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Lists all ServingConfigs linked to a given catalog.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to list serving configs from (e.g., 'default_catalog').
    """
    client = retail_v2alpha.ServingConfigServiceClient()

    # The parent resource name
    parent = client.catalog_path(project_id, location, catalog_id)

    try:
        request = retail_v2alpha.ListServingConfigsRequest(parent=parent)

        print(f"Listing serving configs for catalog: {parent}")
        serving_configs_count = 0
        for serving_config in client.list_serving_configs(request=request):
            print(f"  Serving Config Name: {serving_config.name}")
            print(f"  Display Name: {serving_config.display_name}")
            print(f"  Solution Types: {serving_config.solution_types}")
            serving_configs_count += 1

        if serving_configs_count == 0:
            print("No serving configs found for the specified catalog.")
        else:
            print(f"Successfully listed {serving_configs_count} serving configs.")

    except core_exceptions.NotFound as e:
        print(
            f"Error: The specified catalog '{parent}' was not found. Please ensure the project ID, location, and catalog ID are correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_servingconfigservice_servingconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all ServingConfigs linked to a given catalog."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The retail location (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to list serving configs from (e.g., 'default_catalog'). Defaults to 'default_catalog'.",
    )
    args = parser.parse_args()

    list_serving_configs(args.project_id, args.location, args.catalog_id)
