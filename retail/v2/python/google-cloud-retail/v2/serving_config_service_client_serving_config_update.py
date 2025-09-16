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

# [START retail_v2_servingconfigservice_servingconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_serving_config(
    project_id: str,
    location_id: str,
    catalog_id: str,
    serving_config_id: str,
    new_display_name: str,
) -> None:
    """
    Updates a ServingConfig by changing its display name.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the location where the serving config is located.
            Typically "global".
        catalog_id: The ID of the catalog that contains the serving config.
            Typically "default_catalog".
        serving_config_id: The ID of the serving config to update.
        new_display_name: The new display name for the serving config.
    """
    client = retail_v2.ServingConfigServiceClient()

    serving_config_name = client.serving_config_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    # Construct the ServingConfig object with the new display name.
    # Only fields specified in the update_mask will be updated.
    serving_config = retail_v2.ServingConfig(
        name=serving_config_name,
        display_name=new_display_name,
    )

    # Create a FieldMask to specify that only the 'display_name' field should be updated.
    # This is important to avoid unintended changes to other fields if they are not
    # explicitly set in the serving_config object.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = retail_v2.UpdateServingConfigRequest(
        serving_config=serving_config,
        update_mask=update_mask,
    )

    print(f"Updating serving config: {serving_config_name}")

    try:
        updated_serving_config = client.update_serving_config(request=request)
        print("Update serving config request completed.")
        print(f"Updated serving config name: {updated_serving_config.name}")
        print(
            f"Updated serving config display name: {updated_serving_config.display_name}"
        )
        print(
            f"Updated serving config solution types: {updated_serving_config.solution_types}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: Serving config '{serving_config_name}' not found. Please ensure it exists before attempting to update.\nDetails: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_servingconfigservice_servingconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Google Cloud Retail ServingConfig."
    )
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
        help="The ID of the location where the serving config is located. Typically 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog that contains the serving config. Typically 'default_catalog'.",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID of the serving config to update.",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        default="My New Display Name",
        help="The new display name for the serving config.",
    )

    args = parser.parse_args()

    update_serving_config(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
        new_display_name=args.new_display_name,
    )
