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

# [START retail_v2beta_servingconfigservice_servingconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2beta


def get_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
) -> None:
    """
    Retrieves a specific ServingConfig from the Retail API.

    This method demonstrates how to fetch the details of an existing serving configuration.
    A ServingConfig defines how recommendations or search results are generated and presented.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        serving_config_id: The ID of the serving config to retrieve (e.g., "my_serving_config").
    """
    client = retail_v2beta.ServingConfigServiceClient()

    # Construct the full resource name of the serving config.
    name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    try:
        serving_config = client.get_serving_config(name=name)

        print(f"Successfully retrieved serving config: {serving_config.name}")
        print(f"Display Name: {serving_config.display_name}")
        print(f"Solution Types: {serving_config.solution_types}")
        if serving_config.model_id:
            print(f"Model ID: {serving_config.model_id}")
        if serving_config.diversity_level:
            print(f"Diversity Level: {serving_config.diversity_level}")

    except NotFound:
        print(
            f"Serving config {name} not found. Please ensure the serving config ID is correct."
        )
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2beta_servingconfigservice_servingconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a Retail Serving Config.")
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
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        default="default_serving_config",
        help="The ID of the serving config to retrieve.",
    )

    args = parser.parse_args()

    get_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
