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

# [START retail_v2_servingconfigservice_servingconfig_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError, NotFound
from google.cloud import retail_v2


def create_serving_config(
    project_id: str,
    location_id: str,
    catalog_id: str,
    serving_config_id: str,
) -> None:
    """Creates a ServingConfig in a Retail catalog.

    A ServingConfig defines how search results or recommendation predictions
    are generated, specifying various settings like solution type and associated
    controls.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The ID of the location where the catalog is hosted.
                     Typically 'global' for Retail API.
        catalog_id: The ID of the catalog to which the serving config will be added.
                    Typically 'default_catalog'.
        serving_config_id: The ID to use for the ServingConfig, which will become
                           the final component of the ServingConfig's resource name.
                           This value should be 4-63 characters, and valid characters
                           are /[a-z][0-9]-_/.
    """
    # Create a client
    client = retail_v2.ServingConfigServiceClient()

    # The parent catalog resource name
    parent = client.catalog_path(project_id, location_id, catalog_id)

    serving_config = retail_v2.ServingConfig()
    serving_config.display_name = "Test Serving Config"
    # For demonstration, we use SOLUTION_TYPE_SEARCH. Other types like
    # SOLUTION_TYPE_RECOMMENDATION are also available.
    serving_config.solution_types = [retail_v2.SolutionType.SOLUTION_TYPE_SEARCH]

    request = retail_v2.CreateServingConfigRequest(
        parent=parent,
        serving_config=serving_config,
        serving_config_id=serving_config_id,
    )

    try:
        response = client.create_serving_config(request=request)
        print(f"Serving config created: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Solution Types: {response.solution_types}")
    except AlreadyExists:
        print(f"Serving config '{serving_config_id}' already exists under '{parent}'.")
        print("Consider using an existing serving config or a different ID.")
    except NotFound:
        print(f"Error: The parent catalog '{parent}' was not found.")
        print("Please ensure the project ID, location ID, and catalog ID are correct.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_servingconfigservice_servingconfig_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a Google Cloud Retail ServingConfig."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help="The ID of the location where the catalog is hosted (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the serving config will be added (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID for the new ServingConfig (e.g., 'my_test_serving_config'). ",
    )

    args = parser.parse_args()

    create_serving_config(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
