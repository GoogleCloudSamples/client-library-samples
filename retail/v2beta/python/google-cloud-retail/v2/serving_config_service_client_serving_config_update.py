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

# [START retail_v2beta_servingconfigservice_serving_config_update]
from google.api_core import exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
    new_display_name: str,
) -> None:
    """
    Updates an existing ServingConfig in the Retail API.

    This method demonstrates how to modify an existing serving configuration,
    such as changing its display name. It's crucial to specify the `update_mask`
    to indicate which fields of the ServingConfig are being updated.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        serving_config_id: The ID of the serving config to update.
        new_display_name: The new display name to set for the serving config.
    """
    client = retail_v2beta.ServingConfigServiceClient()

    # Construct the full resource name for the serving config.
    serving_config_name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    # Create a ServingConfig object with the fields to be updated.
    # The 'name' field is required to identify the resource.
    serving_config = retail_v2beta.ServingConfig(
        name=serving_config_name,
        display_name=new_display_name,
        # You can update other fields here as needed, e.g., model_id, solution_types, etc.
        # For example: model_id="new_model_id"
    )

    # Create an update mask to specify which fields to update.
    # This is important for partial updates and prevents unintended changes.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    # If you were updating model_id as well, it would be:
    # update_mask = field_mask_pb2.FieldMask(paths=["display_name", "model_id"])

    request = retail_v2beta.UpdateServingConfigRequest(
        serving_config=serving_config,
        update_mask=update_mask,
    )

    print(f"Updating serving config: {serving_config_name}")
    try:
        updated_serving_config = client.update_serving_config(request=request)
        print(f"Serving config updated successfully: {updated_serving_config.name}")
        print(f"New display name: {updated_serving_config.display_name}")
    except exceptions.NotFound:
        print(
            f"Error: Serving config '{serving_config_name}' not found. "
            "Please ensure the serving config ID is correct and it exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_servingconfigservice_serving_config_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing ServingConfig in the Retail API."
    )
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
        help="The retail location (e.g., 'global'). Default is 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog'). Default is 'default_catalog'.",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID of the serving config to update. Example: 'my_serving_config'",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        default="Updated Serving Config Display Name",
        help="The new display name to set for the serving config.",
    )

    args = parser.parse_args()

    update_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
        new_display_name=args.new_display_name,
    )
