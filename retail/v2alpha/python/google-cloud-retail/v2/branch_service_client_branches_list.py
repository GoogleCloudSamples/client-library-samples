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

# [START retail_v2alpha_branchservice_branches_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2alpha


def list_retail_branches(project_id: str, location: str) -> None:
    """
    Lists all branches within a specified catalog in Google Cloud Retail.

    Branches in Google Cloud Retail represent different versions or views of your
    product catalog. Each catalog automatically has three fixed branches:
    'default_branch', '0', and '1'. The 'default_branch' is the primary branch
    used for serving product data.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
    """
    client = retail_v2alpha.BranchServiceClient()

    # The default catalog is always named 'default_catalog'.
    # Branches are always under a catalog.
    parent = f"projects/{project_id}/locations/{location}/catalogs/default_catalog"

    request = retail_v2alpha.ListBranchesRequest(parent=parent)

    try:
        response = client.list_branches(request=request)
        print("Branches listed successfully:")
        for branch in response.branches:
            print(f"  Branch name: {branch.name}")
    except NotFound as e:
        print(f"Error: The specified catalog or location was not found.")
        print(
            f"Please ensure the project ID, location, and catalog '{parent}' are correct."
        )
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")


# [END retail_v2alpha_branchservice_branches_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List all branches in a Google Cloud Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID (e.g., 'your-project-id').",
    )
    parser.add_argument(
        "--location",
        default="global",
        help="The Google Cloud location for the catalog (e.g., 'global').",
    )
    args = parser.parse_args()

    list_retail_branches(args.project_id, args.location)
