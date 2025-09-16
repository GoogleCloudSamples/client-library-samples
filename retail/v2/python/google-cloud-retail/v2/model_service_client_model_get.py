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

# [START retail_v2_modelservice_model_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_retail_model(
    project_id: str = "retail-gcp-project-id",
    location_id: str = "global",
    catalog_id: str = "default_catalog",
    model_id: str = "test_model_id",
) -> None:
    """Gets a specific retail model by its name.

    This method demonstrates how to retrieve the details of an existing model
    in the Retail API, such as its display name, type, and training state.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the location where the model is located (e.g., 'global').
        catalog_id: The ID of the catalog where the model belongs (e.g., 'default_catalog').
        model_id: The ID of the model to retrieve.
    """
    client = retail_v2.ModelServiceClient()

    name = client.model_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        model=model_id,
    )

    request = retail_v2.GetModelRequest(name=name)

    try:
        model = client.get_model(request=request)

        print("Model retrieved successfully:")
        print(f"  Name: {model.name}")
        print(f"  Display Name: {model.display_name}")
        print(f"  Type: {model.type_}")
        print(f"  Serving State: {model.serving_state.name}")
        print(f"  Training State: {model.training_state.name}")
        print(f"  Create Time: {model.create_time}")
        print(f"  Update Time: {model.update_time}")

    except exceptions.NotFound as e:
        print(
            f"Error: Model '{name}' not found. Please ensure the model ID and its path are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while getting model '{name}': {e}.")
    except Exception as e:
        print(f"An unexpected error occurred while getting model '{name}'. {e}")


# [END retail_v2_modelservice_model_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a specific retail model.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help="The ID of the location where the model is located (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog where the model belongs (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        required=True,
        help="The ID of the model to retrieve.",
    )

    args = parser.parse_args()

    get_retail_model(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
        model_id=args.model_id,
    )
