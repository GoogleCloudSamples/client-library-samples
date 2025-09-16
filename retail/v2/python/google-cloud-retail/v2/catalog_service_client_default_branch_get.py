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

# [START retail_v2_catalogservice_defaultbranch_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_default_branch(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Gets the currently set default branch for a catalog.

    This method retrieves the branch that is currently configured as the
    default for a given catalog. API methods like SearchService.Search
    will use this default branch when requests specify "default_branch".

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location/region code.
        catalog_id: The ID of the catalog to get the default branch for.
                    Usually "default_catalog".
    """
    client = retail_v2.CatalogServiceClient()

    catalog_name = client.catalog_path(project_id, location, catalog_id)

    request = retail_v2.GetDefaultBranchRequest(catalog=catalog_name)

    print(f"Getting default branch for catalog: {catalog_name}")

    try:
        response = client.get_default_branch(request=request)

        print("Get default branch request completed.")
        print(f"Default branch: {response.branch}")
        print(f"Set time: {response.set_time}")
        if response.note:
            print(f"Note: {response.note}")

    except exceptions.NotFound as e:
        print(
            f"Error: Catalog or default branch not found for {catalog_name}. Details: {e}"
        )
        print("Please ensure the catalog exists and a default branch has been set.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and catalog ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_catalogservice_defaultbranch_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Gets the default branch for a retail catalog."
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
        help="The retail location/region code (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    get_default_branch(args.project_id, args.location, args.catalog_id)
