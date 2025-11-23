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

# [START retail_v2alpha_update_model]
from google.api_core import exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_model(
    project_id: str,
    location_id: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Updates a Retail model's metadata, specifically its periodic tuning state
    and recommendations filtering option.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the location where the model is located (e.g., "global").
        catalog_id: The ID of the catalog that the model belongs to (e.g., "default_catalog").
        model_id: The ID of the model to update.
    """
    client = retail_v2alpha.ModelServiceClient()

    # The full resource name of the model to update.
    model_name = client.model_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        model=model_id,
    )

    try:
        existing_model = client.get_model(name=model_name)
        print(f"Existing model '{model_name}' found:")
        print(f"  Display Name: {existing_model.display_name}")
        print(f"  Periodic Tuning State: {existing_model.periodic_tuning_state.name}")
        print(f"  Filtering Option: {existing_model.filtering_option.name}")

        model_to_update = retail_v2alpha.Model(
            name=model_name,  # The 'name' field is required for the update request.
            periodic_tuning_state=retail_v2alpha.Model.PeriodicTuningState.PERIODIC_TUNING_DISABLED,
            filtering_option=retail_v2alpha.RecommendationsFilteringOption.RECOMMENDATIONS_FILTERING_DISABLED,
            # This display_name will be ignored by the API, demonstrating that
            # only specific fields are updateable.
            display_name="Updated Test Model Display Name (ignored)",
        )

        # Create a FieldMask to explicitly specify which fields to update.
        # It's crucial to only include fields that are actually updateable
        # by the API to avoid unexpected behavior or errors.
        update_mask = field_mask_pb2.FieldMask(
            paths=[
                "periodic_tuning_state",
                "filtering_option",
            ]
        )

        updated_model = client.update_model(
            model=model_to_update,
            update_mask=update_mask,
        )

        print(f"Model '{updated_model.name}' updated successfully.")
        print(
            f"  New Periodic Tuning State: {updated_model.periodic_tuning_state.name}"
        )
        print(f"  New Filtering Option: {updated_model.filtering_option.name}")
        # Verify that display_name was NOT updated, as it's not an updateable field.
        print(f"  Display Name (should be original): {updated_model.display_name}")

    except exceptions.NotFound as e:
        print(f"Error: Model '{model_name}' not found. Please ensure the model exists.")
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"Error updating model '{model_name}': {e}")
        print("Please check the model name, permissions, and request parameters.")

    # [END retail_v2alpha_update_model]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Retail model's metadata.")
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
        help="The ID of the location where the model is located.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog that the model belongs to.",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        required=True,
        help="The ID of the model to update.",
    )

    args = parser.parse_args()

    update_model(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
        model_id=args.model_id,
    )
