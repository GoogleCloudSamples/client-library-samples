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

# [START retail_v2beta_catalogservice_defaultbranch_get]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def get_default_branch(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Retrieves the currently set default branch for a given catalog.

    This method helps to identify which branch is active for serving
    search and recommendation requests. The default branch is typically
    'default_branch' or a specific branch ID (e.g., '1', '2') if it has been
    explicitly set.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
    """
    client = retail_v2beta.CatalogServiceClient()

    # The full resource name of the catalog.
    catalog_name = client.catalog_path(project_id, location, catalog_id)

    # Construct the request object.
    request = retail_v2beta.GetDefaultBranchRequest(catalog=catalog_name)

    try:
        response = client.get_default_branch(request=request)

        print(f"Retrieved default branch for catalog {catalog_name}:")
        print(f"  Branch: {response.branch}")
        print(f"  Set time: {response.set_time}")
        if response.note:
            print(f"  Note: {response.note}")

    except exceptions.NotFound:
        print(
            f"Error: Default branch not found for catalog {catalog_name}. "
            "Ensure the catalog exists and a default branch has been set."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_catalogservice_defaultbranch_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the default branch for a Retail catalog."
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
        help="The location of the catalog (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog'). Defaults to 'default_catalog'.",
    )

    args = parser.parse_args()

    get_default_branch(args.project_id, args.location, args.catalog_id)
