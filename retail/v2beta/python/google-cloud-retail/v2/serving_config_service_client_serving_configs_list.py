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

# [START retail_v2beta_servingconfigservice_servingconfigs_list]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def list_serving_configs(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """Lists all ServingConfigs linked to a specific catalog.

    Serving configurations define how search and recommendation results are
    generated, including aspects like ranking, filtering, and diversity.
    Listing them allows you to inspect and manage the different configurations
    available for your retail catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
        catalog_id: The ID of the catalog to list serving configs from (e.g., "default_catalog").
    """
    client = retail_v2beta.ServingConfigServiceClient()

    # The parent resource name
    parent = client.catalog_path(project_id, location, catalog_id)

    print(f"Listing serving configs for parent: {parent}")

    try:
        serving_configs = client.list_serving_configs(parent=parent)
        for serving_config in serving_configs:
            print(f"Serving Config Name: {serving_config.name}")
            print(f"Serving Config Display Name: {serving_config.display_name}")
            print(f"Serving Config Solution Types: {serving_config.solution_types}")
            print("---")

    except exceptions.NotFound as e:
        print(f"Error: The specified catalog or location was not found.")
        print(f"Please ensure the parent resource '{parent}' exists and is correct.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_servingconfigservice_servingconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List serving configs for a given catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to list serving configs from. Defaults to 'default_catalog'.",
    )

    args = parser.parse_args()

    list_serving_configs(args.project_id, args.location, args.catalog_id)
