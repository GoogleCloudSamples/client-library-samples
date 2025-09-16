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

# [START retail_v2_catalogservice_completionconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_completion_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Gets a CompletionConfig. The CompletionConfig resource contains settings
    for autocomplete functionality.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog (e.g., 'default_catalog').
    """
    client = retail_v2.CatalogServiceClient()

    # The `name` of the CompletionConfig to retrieve.
    name = client.completion_config_path(project_id, location, catalog_id)

    try:
        completion_config = client.get_completion_config(name=name)

        print("Get completion config response:")
        print(f"Completion Config Name: {completion_config.name}")
        print(f"Matching Order: {completion_config.matching_order}")
        print(f"Max Suggestions: {completion_config.max_suggestions}")
        print(f"Min Prefix Length: {completion_config.min_prefix_length}")
        print(f"Auto Learning: {completion_config.auto_learning}")

    except exceptions.NotFound as e:
        print(f"Completion config not found for name: {name}. Error: {e}")
        print("Please ensure the catalog and completion config exist.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2_catalogservice_completionconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a CompletionConfig for a Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
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
        help="The ID of the catalog (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    get_completion_config(args.project_id, args.location, args.catalog_id)
