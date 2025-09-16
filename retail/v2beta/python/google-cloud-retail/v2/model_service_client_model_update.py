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

# [START retail_v2beta_modelservice_update_model]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_retail_model(
    project_id: str,
    location: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Updates a Retail model's metadata, specifically its periodic tuning state
    and recommendations filtering option.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to which the model belongs (e.g., 'default_catalog').
        model_id: The ID of the model to update.
    """

    client = retail_v2beta.ModelServiceClient()

    # Construct the full resource name for the model.
    # models are global resources, so the location is typically 'global'.
    model_name = client.model_path(project_id, location, catalog_id, model_id)

    # Create a Model object with the fields to be updated.
    # Only `filtering_option` and `periodic_tuning_state` can be updated.
    updated_model = retail_v2beta.Model(
        name=model_name,
        periodic_tuning_state=retail_v2beta.Model.PeriodicTuningState.PERIODIC_TUNING_DISABLED,
        filtering_option=retail_v2beta.RecommendationsFilteringOption.RECOMMENDATIONS_FILTERING_DISABLED,
    )

    # Create a FieldMask to specify which fields of the model are being updated.
    # This is crucial for partial updates.
    update_mask = field_mask_pb2.FieldMask(
        paths=["periodic_tuning_state", "filtering_option"]
    )

    request = retail_v2beta.UpdateModelRequest(
        model=updated_model,
        update_mask=update_mask,
    )

    try:
        response = client.update_model(request=request)
        print("Model updated successfully.")
        print(f"Updated model name: {response.name}")
        print(f"Updated periodic tuning state: {response.periodic_tuning_state.name}")
        print(f"Updated filtering option: {response.filtering_option.name}")
    except NotFound:
        print(f"Error: Model '{model_name}' not found.")
        print("Please ensure the model ID and path are correct.")
    except GoogleAPICallError as e:
        print(f"Error updating model: {e}")
        print(
            "Please check the model name and ensure you have the necessary permissions."
        )


# [END retail_v2beta_modelservice_update_model]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Retail model's periodic tuning state and filtering option."
    )
    parser.add_argument(
        "--project_id",
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
        help="The ID of the catalog to which the model belongs.",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        required=True,
        help="The ID of the model to update.",
    )

    args = parser.parse_args()

    update_retail_model(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        model_id=args.model_id,
    )
