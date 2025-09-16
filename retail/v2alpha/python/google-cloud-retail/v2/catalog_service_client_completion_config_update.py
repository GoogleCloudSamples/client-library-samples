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

# [START retail_v2alpha_catalogservice_completionconfig_update]
from google.api_core.exceptions import NotFound, PermissionDenied
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_completion_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Updates the [CompletionConfig][google.cloud.retail.v2alpha.CompletionConfig]s.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog to update (e.g., 'default_catalog').
    """

    # Create a client
    client = retail_v2alpha.CatalogServiceClient()

    # Construct the full resource name for the CompletionConfig
    name = client.completion_config_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
    )

    # Construct the CompletionConfig object with updated values
    # Only the following fields are supported for update:
    # - matching_order
    # - max_suggestions
    # - min_prefix_length
    # - auto_learning
    completion_config = retail_v2alpha.CompletionConfig(
        name=name,
        matching_order="exact-prefix",
        max_suggestions=10,
        min_prefix_length=3,
        auto_learning=True,
    )

    # Create a FieldMask to specify which fields to update.
    # If not set, all supported fields are updated.
    update_mask = field_mask_pb2.FieldMask(
        paths=[
            "matching_order",
            "max_suggestions",
            "min_prefix_length",
            "auto_learning",
        ]
    )

    # Construct the request
    request = retail_v2alpha.UpdateCompletionConfigRequest(
        completion_config=completion_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_completion_config(request=request)

        print("Completion config updated successfully:")
        print(f"  Name: {response.name}")
        print(f"  Matching Order: {response.matching_order}")
        print(f"  Max Suggestions: {response.max_suggestions}")
        print(f"  Min Prefix Length: {response.min_prefix_length}")
        print(f"  Auto Learning: {response.auto_learning}")

    except NotFound as e:
        print(f"Error: Completion config not found for catalog '{catalog_id}'. {e}")
        print("Please ensure the project ID, location, and catalog ID are correct.")
    except PermissionDenied as e:
        print(f"Error: Permission denied to update completion config. {e}")
        print(
            "Please ensure your service account has the necessary permissions (e.g., Retail Editor)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_catalogservice_completionconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Google Cloud Retail CompletionConfig."
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
        help="The retail location (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to update (e.g., 'default_catalog'). Defaults to 'default_catalog'.",
    )

    args = parser.parse_args()

    update_completion_config(args.project_id, args.location, args.catalog_id)
