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

# [START retail_v2alpha_serving_config_create]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def create_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
    display_name: str,
) -> None:
    """Creates a ServingConfig for a given catalog.

    This sample demonstrates how to create a ServingConfig, which defines how
    search results or recommendation predictions are generated.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to associate the serving config with (e.g., 'default_catalog').
        serving_config_id: The ID to use for the ServingConfig, which will become the final component of its resource name.
                           This value should be 4-63 characters, and valid characters are /[a-z][0-9]-_/.
        display_name: The human-readable display name for the serving config.
    """
    client = retail_v2alpha.ServingConfigServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    # The ServingConfig to create.
    # For search solution types, a display_name and at least one solution_type are required.
    # For recommendation solution types, a display_name, solution_type, and model_id are required.
    serving_config = retail_v2alpha.ServingConfig(
        display_name=display_name,
        solution_types=[retail_v2alpha.SolutionType.SOLUTION_TYPE_SEARCH],
        # For recommendation serving configs, uncomment and set a model_id:
        # model_id="YOUR_MODEL_ID",
    )

    request = retail_v2alpha.CreateServingConfigRequest(
        parent=parent,
        serving_config=serving_config,
        serving_config_id=serving_config_id,
    )

    print(f"Creating serving config: {serving_config_id} under parent: {parent}")

    try:
        response = client.create_serving_config(request=request)
        print(f"Serving config created: {response.name}")
    except exceptions.AlreadyExists as e:
        print(
            f"Serving config '{serving_config_id}' already exists under '{parent}'. "
            f"Consider using an existing serving config or a different ID. Error: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error creating serving config: {e}")


# [END retail_v2alpha_serving_config_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Retail Serving Config.")
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
        help="The retail location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to associate the serving config with.",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID for the new ServingConfig (e.g., 'my_test_serving_config').",
    )
    parser.add_argument(
        "--display_name",
        type=str,
        default="My Serving Config",
        help="The human-readable display name for the serving config.",
    )

    args = parser.parse_args()

    create_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
        display_name=args.display_name,
    )
