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

# [START retail_v2beta_modelservice_model_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2beta


def get_retail_model(
    project_id: str,
    location_id: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Gets a Retail model.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The ID of the location where the model is located.
            Commonly "global".
        catalog_id: The ID of the catalog to which the model belongs.
            Commonly "default_catalog".
        model_id: The ID of the model to retrieve.
    """

    client = retail_v2beta.ModelServiceClient()

    # The resource name of the model to get.
    model_name = client.model_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        model=model_id,
    )

    try:
        request = retail_v2beta.GetModelRequest(name=model_name)

        model = client.get_model(request=request)

        print(f"Retrieved model: {model.name}")
        print(f"  Display Name: {model.display_name}")
        print(f"  Type: {model.type}")
        print(f"  Serving State: {model.serving_state.name}")
        print(f"  Training State: {model.training_state.name}")
        if model.last_tune_time:
            print(f"  Last Tune Time: {model.last_tune_time.isoformat()}")

    except NotFound:
        print(f"Model {model_name} not found. Please ensure the model ID is correct.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2beta_modelservice_model_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a Retail model.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help="The ID of the location where the model is located. Commonly 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the model belongs. Commonly 'default_catalog'.",
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
