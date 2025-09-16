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

# [START retail_v2_servingconfigservice_servingconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
) -> None:
    """
    Gets a ServingConfig.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location/region code.
            (e.g. 'us-central1')
        catalog_id: The ID of the catalog.
            (e.g. 'default_catalog')
        serving_config_id: The ID of the serving config to retrieve.
            (e.g. 'my_serving_config_id')
    """
    # Create a client
    client = retail_v2.ServingConfigServiceClient()

    # The full resource name of the serving config.
    name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    try:
        serving_config = client.get_serving_config(name=name)

        print(f"Serving config retrieved: {serving_config.name}")
        print(f"Display name: {serving_config.display_name}")
        print(f"Solution types: {serving_config.solution_types}")
        if serving_config.model_id:
            print(f"Model ID: {serving_config.model_id}")
    except exceptions.NotFound:
        print(f"Serving config {name} not found.")
    except Exception as e:
        print(f"Error getting serving config: {e}")


# [END retail_v2_servingconfigservice_servingconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a serving config in Google Cloud Retail."
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
        help="The retail location/region code (e.g., 'us-central1').",
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
        required=True,
        help="The ID of the serving config to retrieve.",
    )

    args = parser.parse_args()

    get_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
