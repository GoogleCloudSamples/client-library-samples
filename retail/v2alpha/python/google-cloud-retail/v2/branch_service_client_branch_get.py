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

# [START retail_v2alpha_branchservice_get_branch]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_branch(
    project_id: str,
    location: str,
    catalog_id: str,
    branch_id: str,
) -> None:
    """
    Retrieves a specific branch from a catalog.

    This method demonstrates how to fetch details of a branch, such as its
    display name, whether it's the default branch, and product statistics.
    The 'default_branch' is a special branch that always exists for a catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., 'global').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
        branch_id: The ID of the branch to retrieve (e.g., 'default_branch').
    """
    client = retail_v2alpha.BranchServiceClient()

    # Construct the full resource name of the branch.
    name = client.branch_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        branch=branch_id,
    )

    # Construct the request.
    request = retail_v2alpha.GetBranchRequest(name=name)

    print(f"Retrieving branch: {name}")

    try:
        response = client.get_branch(request=request)

        print(f"Successfully retrieved branch: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Is Default Branch: {response.is_default}")
        if response.last_product_import_time:
            print(
                f"Last Product Import Time: {response.last_product_import_time.isoformat()}"
            )
        else:
            print("Last Product Import Time: Not available (no import has been made)")

        # Product count statistics are not populated in BASIC view, which is the default.
        # To get these, you would need to set `view=retail_v2alpha.BranchView.FULL` in the request.
        if response.product_count_stats:
            print("Product Count Statistics:")
            for stat in response.product_count_stats:
                print(f"  Scope: {stat.scope.name}")
                for key, value in stat.counts.items():
                    print(f"    {key}: {value}")

        if response.quality_metrics:
            print("Quality Metrics:")
            for metric in response.quality_metrics:
                print(f"  Requirement Key: {metric.requirement_key}")
                print(f"    Qualified Product Count: {metric.qualified_product_count}")
                print(
                    f"    Unqualified Product Count: {metric.unqualified_product_count}"
                )
                print(
                    f"    Suggested Quality Percent Threshold: {metric.suggested_quality_percent_threshold:.2f}%"
                )
                if metric.unqualified_sample_products:
                    print("    Unqualified Sample Products (first 3):")
                    for product in metric.unqualified_sample_products[:3]:
                        print(f"      - {product.name} (Title: {product.title})")

    except exceptions.NotFound as e:
        print(f"Error: The specified branch was not found: {name}")
        print(
            f"Please ensure the project ID, location, catalog ID, and branch ID are correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(f"Please check your network connection and API permissions.")


# [END retail_v2alpha_branchservice_get_branch]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific branch from a catalog."
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
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--branch_id",
        type=str,
        default="default_branch",
        help="The ID of the branch to retrieve (e.g., 'default_branch').",
    )

    args = parser.parse_args()

    get_branch(
        args.project_id,
        args.location,
        args.catalog_id,
        args.branch_id,
    )
