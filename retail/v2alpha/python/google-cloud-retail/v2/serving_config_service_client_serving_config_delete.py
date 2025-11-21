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

# [START retail_v2alpha_servingconfigservice_servingconfig_delete]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2alpha


def delete_serving_config(
    project_id: str, location: str, catalog_id: str, serving_config_id: str
) -> None:
    """
    Deletes a ServingConfig from a Google Cloud Retail catalog.

    This method demonstrates how to remove a previously created ServingConfig.
    A ServingConfig defines how recommendations or search results are generated
    and presented. Deleting a ServingConfig means it can no longer be used
    for serving.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog.
        serving_config_id: The ID of the serving config to delete.
    """
    client = retail_v2alpha.ServingConfigServiceClient()

    # Construct the full resource name for the serving config.
    name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    # Prepare the request object.
    # The DeleteServingConfigRequest only requires the 'name' of the serving config.
    request = retail_v2alpha.DeleteServingConfigRequest(name=name)

    try:
        client.delete_serving_config(request=request)
        print(f"Serving config {name} deleted successfully.")
    except NotFound:
        print(
            f"Serving config {name} not found. It might have already been deleted or never existed."
        )
        print("Please ensure the serving config ID and path are correct.")
    except GoogleAPICallError as e:
        print(f"Error deleting serving config {name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_servingconfigservice_servingconfig_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a ServingConfig from a Google Cloud Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID (e.g., 'your-project-id').",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the catalog (e.g., 'global' or 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--serving_config_id",
        type=str,
        required=True,
        help="The ID of the serving config to delete.",
    )
    args = parser.parse_args()

    delete_serving_config(
        args.project_id, args.location, args.catalog_id, args.serving_config_id
    )
