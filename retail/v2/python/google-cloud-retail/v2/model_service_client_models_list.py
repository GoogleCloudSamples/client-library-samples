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

# [START retail_modelservice_models_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2 as retail


def list_retail_models(
    project_id: str,
    location: str,
    catalog_id: str = "default_catalog",
) -> None:
    """
    Lists all models associated with a given catalog.

    This function demonstrates how to retrieve a list of trained models
    within a specific Google Cloud Retail catalog. Models are used for
    recommendations and search functionalities.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global", "us-central1").
        catalog_id: The ID of the catalog to list models from.
                    Defaults to "default_catalog".
    """
    client = retail.ModelServiceClient()

    # The parent resource for models is the catalog.
    parent = client.catalog_path(project_id, location, catalog_id)

    print(f"Listing models for catalog: {parent}")

    try:
        request = retail.ListModelsRequest(parent=parent)
        response = client.list_models(request=request)

        found_models = False
        for model in response:
            found_models = True
            print(f"  Model Name: {model.name}")
            print(f"  Display Name: {model.display_name}")
            print(f"  Type: {model.type_}")
            print(f"  Training State: {model.training_state.name}")
            print(f"  Serving State: {model.serving_state.name}")
            print("  ---")

        if not found_models:
            print(f"No models found for catalog: {parent}")

    except NotFound as e:
        print(f"Error: The specified catalog '{parent}' was not found.")
        print(f"Please ensure the project ID, location, and catalog ID are correct.")
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(f"Please check your network connection and permissions.")


# [END retail_modelservice_models_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all models in a Google Cloud Retail catalog."
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
        help="The location of the catalog (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to list models from. Defaults to 'default_catalog'.",
    )

    args = parser.parse_args()

    list_retail_models(args.project_id, args.location, args.catalog_id)
