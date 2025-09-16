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

# [START retail_v2alpha_catalogservice_defaultbranch_get]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_default_branch(
    project_id: str,
    location: str,
) -> None:
    """
    Retrieves the currently set default branch for a given catalog.

    This method allows developers to check which branch is active for operations
    like product search and recommendations. The default branch is typically
    'default_branch', but can be changed to a specific branch ID (e.g., '1')
    using the SetDefaultBranch method for staging or A/B testing purposes.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
    """
    client = retail_v2alpha.CatalogServiceClient()

    # Construct the full resource name of the catalog.
    catalog_name = client.catalog_path(project_id, location, "default_catalog")

    try:
        request = retail_v2alpha.GetDefaultBranchRequest(catalog=catalog_name)

        response = client.get_default_branch(request=request)

        print("Get default branch response:")
        print(f"  Current default branch: {response.branch}")
        print(f"  Set time: {response.set_time}")
        if response.note:
            print(f"  Note: {response.note}")

    except exceptions.NotFound as e:
        print(f"Error: The specified catalog or default branch was not found: {e}")
        print("Please ensure the project ID, location, and catalog name are correct.")
        print(f"Catalog name attempted: {catalog_name}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_catalogservice_defaultbranch_get]

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
        help="The location of the catalog (e.g., 'global').",
    )
    args = parser.parse_args()

    get_default_branch(args.project_id, args.location)
