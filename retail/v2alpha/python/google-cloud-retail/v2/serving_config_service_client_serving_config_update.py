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

# [START retail_v2alpha_servingconfigservice_servingconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
) -> None:
    """
    Updates a ServingConfig in the Retail API. This sample demonstrates how to
    change the display name and solution types of an existing serving config.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to which the serving config belongs
                    (e.g., 'default_catalog').
        serving_config_id: The ID of the serving config to update.
    """
    client = retail_v2alpha.ServingConfigServiceClient()

    # The full resource name of the serving config to update.
    serving_config_name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    # Prepare the ServingConfig object with the updated fields.
    # The 'name' field is required to identify the resource.
    # The 'display_name' and 'solution_types' are examples of fields to update.
    updated_serving_config = retail_v2alpha.ServingConfig(
        name=serving_config_name,
        display_name="Updated Search Serving Config",
        # You can update other fields here, e.g., price_reranking_level, diversity_level
    )

    # Create a FieldMask to specify which fields are being updated.
    # If update_mask is not set, all supported fields are updated.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = retail_v2alpha.UpdateServingConfigRequest(
        serving_config=updated_serving_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_serving_config(request=request)
        print("Serving config updated successfully:")
        print(f"  Name: {response.name}")
        print(f"  Display Name: {response.display_name}")
    except exceptions.NotFound:
        print(f"Error: Serving config '{serving_config_name}' not found.")
        print("Please ensure the serving config exists.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2alpha_servingconfigservice_servingconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Google Cloud Retail Serving Config."
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
        help="The retail location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the serving config belongs.",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID of the serving config to update.",
    )
    args = parser.parse_args()

    update_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
