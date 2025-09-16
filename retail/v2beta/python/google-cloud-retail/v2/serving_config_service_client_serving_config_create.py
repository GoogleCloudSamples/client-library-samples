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

# [START retail_v2beta_servingconfigservice_create_serving_config]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import retail_v2beta


def create_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
) -> None:
    """
    Creates a ServingConfig for a given catalog.

    ServingConfigs define how search or recommendation results are generated,
    allowing you to customize ranking, filtering, and other behaviors.
    This sample demonstrates how to create a basic ServingConfig for search.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "global" or "us-central1").
        catalog_id: The ID of the catalog to create the serving config in (e.g., "default_catalog").
        serving_config_id: The ID to use for the ServingConfig, which will become
            the final component of the ServingConfig's resource name.
            This value should be 4-63 characters, and valid characters are /[a-z][0-9]-_/.
    """

    client = retail_v2beta.ServingConfigServiceClient()

    # The parent catalog resource name
    parent = client.catalog_path(project_id, location, catalog_id)

    # Create a ServingConfig object.
    # A ServingConfig configures how search or recommendation results are generated.
    # For this example, we create a basic search-oriented serving config.
    serving_config = retail_v2beta.ServingConfig(
        display_name=f"Python Test Serving Config {serving_config_id}",
        solution_types=[retail_v2beta.SolutionType.SOLUTION_TYPE_SEARCH],
    )

    request = retail_v2beta.CreateServingConfigRequest(
        parent=parent,
        serving_config=serving_config,
        serving_config_id=serving_config_id,
    )

    try:
        response = client.create_serving_config(request=request)
        print(f"Serving config created: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"Solution types: {response.solution_types}")
    except AlreadyExists as e:
        print(f"Serving config '{serving_config_id}' already exists: {e}")
        print("Please use a unique serving_config_id or delete the existing one.")
    except GoogleAPICallError as e:
        print(f"Error creating serving config: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_servingconfigservice_create_serving_config]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Retail ServingConfig.")
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
        help="The Google Cloud location.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to create the serving config in.",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID for the new ServingConfig.",
    )

    args = parser.parse_args()

    create_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
