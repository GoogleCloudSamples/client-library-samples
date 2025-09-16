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

# [START retail_v2_servingconfigservice_servingconfig_delete]
from google.api_core import exceptions
from google.cloud import retail_v2


def delete_serving_config(
    project_id: str,
    location: str,
    catalog_id: str,
    serving_config_id: str,
):
    """
    Deletes a serving config.

    The delete operation removes the serving config from the Retail catalog.
    If the serving config does not exist, a NotFound error is returned.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog.
        serving_config_id: The ID of the serving config to delete.
    """
    client = retail_v2.ServingConfigServiceClient()

    # The resource name of the ServingConfig to delete.
    name = client.serving_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        serving_config=serving_config_id,
    )

    try:
        client.delete_serving_config(name=name)
        print(f"Serving config {name} deleted successfully.")
    except exceptions.NotFound:
        print(f"Serving config {name} not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"Google Cloud Retail API error deleting serving config {name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred while deleting serving config {name}: {e}")


# [END retail_v2_servingconfigservice_servingconfig_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Delete a Retail serving config.")
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
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
        help="The ID of the catalog.",
    )
    parser.add_argument(
        "--serving_config_id",
        required=True,
        type=str,
        help="The ID of the serving config to delete.",
    )

    args = parser.parse_args()

    delete_serving_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        serving_config_id=args.serving_config_id,
    )
