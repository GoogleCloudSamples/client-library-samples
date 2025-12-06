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

# [START retail_v2beta_modelservice_models_list]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2beta


def list_models(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all the models linked to a given catalog.

    The `list_models` method retrieves a paginated list of models associated
    with a specific catalog within a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog to list models from (e.g., "global").
    """
    client = retail_v2beta.ModelServiceClient()

    # The `parent` field represents the catalog resource for which to list models.
    parent = f"projects/{project_id}/locations/{location}/catalogs/default_catalog"

    try:
        request = retail_v2beta.ListModelsRequest(parent=parent)

        print(f"Listing models for catalog: {parent}")
        for model in client.list_models(request=request):
            print(f"  Model name: {model.name}")
            print(f"  Display name: {model.display_name}")
            print(f"  Model type: {model.type_}")
            print(f"  Training state: {model.training_state.name}")
            print("---")

    except NotFound as e:
        print(f"Error: The specified catalog or project was not found: {e}")
        print(
            "Please ensure the project ID and location are correct and that the default_catalog exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_modelservice_models_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists models in a Google Cloud Retail catalog."
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
        help="The location of the catalog (e.g., 'global').",
    )

    args = parser.parse_args()

    list_models(args.project_id, args.location)
