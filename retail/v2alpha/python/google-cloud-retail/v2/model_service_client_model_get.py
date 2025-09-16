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

# [START retail_v2alpha_modelservice_model_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2alpha


def get_retail_model(
    project_id: str,
    location_id: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Retrieves a specific Retail model by its name.

    Args:
        project_id: The Google Cloud project number.
        location_id: The ID of the location where the model is located (e.g., "global").
        catalog_id: The ID of the catalog that contains the model (e.g., "default_catalog").
        model_id: The ID of the model to retrieve (e.g., "test-model-id").
    """
    client = retail_v2alpha.ModelServiceClient()

    # Construct the full resource name of the model.
    name = client.model_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        model=model_id,
    )

    try:
        request = retail_v2alpha.GetModelRequest(name=name)

        model = client.get_model(request=request)

        print(f"Successfully retrieved model: {model.name}")
        print(f"Display Name: {model.display_name}")
        print(f"Type: {model.type}")
        print(f"Serving State: {model.serving_state.name}")
        print(f"Training State: {model.training_state.name}")
        print(f"Optimization Objective: {model.optimization_objective}")

    except NotFound:
        print(
            f"Model not found: {name}. "
            "Please ensure the model ID is correct and the model exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    # [END retail_v2alpha_modelservice_model_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a Retail model.")
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
        help="The ID of the catalog that contains the model (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        help="The ID of the model to retrieve (e.g., 'test-model-id').",
    )
    args = parser.parse_args()

    get_retail_model(
        args.project_id,
        args.location_id,
        args.catalog_id,
        args.model_id,
    )
