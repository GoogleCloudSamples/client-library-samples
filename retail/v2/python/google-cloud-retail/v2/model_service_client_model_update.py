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

# [START retail_v2_modelservice_model_update]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_retail_model(
    project_id: str, location_id: str, catalog_id: str, model_id: str
) -> None:
    """
    Updates an existing Retail model's metadata.

    This method demonstrates how to update specific fields of a model, such as
    `periodic_tuning_state` or `filtering_option`. Only these fields can be
    updated using this method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the location where the model is located (e.g., "global").
        catalog_id: The ID of the catalog to which the model belongs (e.g., "default_catalog").
        model_id: The ID of the model to update.
    """

    client = retail_v2.ModelServiceClient()

    model_name = client.model_path(project_id, location_id, catalog_id, model_id)

    try:
        existing_model = client.get_model(name=model_name)
        print(f"Existing model retrieved: {existing_model.name}")
        print(
            f"  Current periodic_tuning_state: {existing_model.periodic_tuning_state.name}"
        )

        # Prepare the model object with the fields to be updated.
        # Only `filtering_option` and `periodic_tuning_state` can be updated.
        updated_model = retail_v2.Model(
            name=model_name,
            periodic_tuning_state=retail_v2.Model.PeriodicTuningState.PERIODIC_TUNING_DISABLED,
        )

        # Create a FieldMask to specify which fields are being updated.
        # This is crucial for partial updates.
        update_mask = field_mask_pb2.FieldMask(paths=["periodic_tuning_state"])

        print(f"Updating model: {model_name} with new periodic_tuning_state...")
        response = client.update_model(model=updated_model, update_mask=update_mask)

        print(f"Model updated successfully: {response.name}")
        print(f"  New display_name: {response.display_name}")
        print(f"  New type: {response.type_}")
        print(f"  New periodic_tuning_state: {response.periodic_tuning_state.name}")

    except NotFound:
        print(
            f"Error: Model '{model_name}' not found. Please ensure the model ID is correct."
        )
        print("You may need to create the model first using `create_model`.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, catalog, and model ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_modelservice_model_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Retail model's metadata."
    )
    parser.add_argument("--project_id", type=str, required=True, help="The Google Cloud project ID.")
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help='The ID of the location where the model is located (e.g., "global").',
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help='The ID of the catalog to which the model belongs (e.g., "default_catalog").',
    )
    parser.add_argument("--model_id", type=str, help="The ID of the model to update.")
    args = parser.parse_args()

    update_retail_model(
        args.project_id, args.location_id, args.catalog_id, args.model_id
    )
