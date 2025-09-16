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

# [START retail_v2alpha_catalogservice_completionconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2alpha


def get_completion_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """Gets a CompletionConfig for a given catalog.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location/region code (e.g., 'global' or 'us-central1').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
    """
    client = retail_v2alpha.CatalogServiceClient()

    # Construct the full resource name for the CompletionConfig.
    name = client.completion_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    request = retail_v2alpha.GetCompletionConfigRequest(name=name)

    try:
        completion_config = client.get_completion_config(request=request)

        print("Get completion config response:")
        print(f"  Name: {completion_config.name}")
        print(f"  Matching Order: {completion_config.matching_order}")
        print(f"  Max Suggestions: {completion_config.max_suggestions}")
        print(f"  Min Prefix Length: {completion_config.min_prefix_length}")
        print(f"  Auto Learning: {completion_config.auto_learning}")
    except NotFound as e:
        print(f"Completion config not found for name {name}. Error: {e}")
        print("Please ensure the catalog ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred while getting the completion config: {e}")
        print(
            "Please check your project settings, network connectivity, and API permissions."
        )


# [END retail_v2alpha_catalogservice_completionconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a Retail CompletionConfig for a given catalog."
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
        help="The retail location/region code (e.g., 'global' or 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    args = parser.parse_args()

    get_completion_config(args.project_id, args.location, args.catalog_id)
