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

# [START retail_v2_catalogservice_completionconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_completion_config(
    project_id: str,
    location_id: str,
    catalog_id: str,
) -> None:
    """
    Updates the CompletionConfig for a given catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the location where the catalog is located.
        catalog_id: The ID of the catalog to update the completion config for.
    """
    # Create a client
    client = retail_v2.CatalogServiceClient()

    # Build the config path
    name = client.completion_config_path(project_id, location_id, catalog_id)

    # Construct the CompletionConfig object with the desired updates.
    # Only the following fields are supported for update:
    #   matching_order, max_suggestions, min_prefix_length, auto_learning
    updated_completion_config = retail_v2.CompletionConfig(
        name=name,
        max_suggestions=15,
        min_prefix_length=3,
        auto_learning=True,
        matching_order="exact-prefix",
    )

    # Create a field mask to specify which fields of the CompletionConfig are being updated.
    # If not set, all supported fields are updated.
    update_mask = field_mask_pb2.FieldMask(
        paths=[
            "max_suggestions",
            "min_prefix_length",
            "auto_learning",
            "matching_order",
        ]
    )

    try:
        # Make the request to update the CompletionConfig.
        response = client.update_completion_config(
            completion_config=updated_completion_config,
            update_mask=update_mask,
        )

        print("Updated Completion Config:")
        print(f"Name: {response.name}")
        print(f"Max Suggestions: {response.max_suggestions}")
        print(f"Min Prefix Length: {response.min_prefix_length}")
        print(f"Auto Learning: {response.auto_learning}")
        print(f"Matching Order: {response.matching_order}")

    except exceptions.NotFound as e:
        print(
            f"Error: CompletionConfig not found for catalog '{catalog_id}'. Please ensure the catalog ID is correct and the CompletionConfig exists. Details: {e}"
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided for updating CompletionConfig. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_catalogservice_completionconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Google Cloud Retail CompletionConfig."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help="The ID of the location where the catalog is located.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to update the completion config for.",
    )

    args = parser.parse_args()

    update_completion_config(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
    )
