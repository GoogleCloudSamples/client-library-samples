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

# [START retail_v2beta_catalogservice_completionconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2beta


def get_completion_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Gets a CompletionConfig for a given catalog.

    The CompletionConfig resource contains settings for the autocomplete feature,
    such as matching order, maximum suggestions, minimum prefix length, and auto-learning status.
    This configuration is specific to each catalog within a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
    """
    client = retail_v2beta.CatalogServiceClient()

    # The name of the CompletionConfig resource to retrieve.
    name = client.completion_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    try:
        request = retail_v2beta.GetCompletionConfigRequest(name=name)

        completion_config = client.get_completion_config(request=request)

        print(f"Name: {completion_config.name}")
        print(f"Matching order: {completion_config.matching_order}")
        print(f"Max suggestions: {completion_config.max_suggestions}")
        print(f"Min prefix length: {completion_config.min_prefix_length}")
        print(f"Auto learning: {completion_config.auto_learning}")

    except NotFound as e:
        print(f"CompletionConfig not found for name {name}. Error: {e}")
        print("Please ensure the catalog ID and location are correct.")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2beta_catalogservice_completionconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a Retail CompletionConfig for a catalog."
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

    args = parser.parse_args()

    get_completion_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
    )
