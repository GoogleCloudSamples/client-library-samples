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

# [START retail_v2beta_catalogservice_completionconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2beta
from google.protobuf import field_mask_pb2


def update_completion_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Updates the CompletionConfig for a given catalog.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to update the completion config for.
                    Usually "default_catalog".
    """

    # The `CompletionConfig` resource name
    name = f"projects/{project_id}/locations/{location}/catalogs/{catalog_id}/completionConfig"

    client = retail_v2beta.CatalogServiceClient()

    # Construct the CompletionConfig object with the desired updates.
    # Only the fields specified in `update_mask` will be updated.
    # Supported fields for update are: matching_order, max_suggestions,
    # min_prefix_length, auto_learning.
    completion_config = retail_v2beta.CompletionConfig(
        name=name,
        max_suggestions=15,  # Example: Update max_suggestions to 15
        auto_learning=True,  # Example: Enable auto_learning
    )

    # Create a FieldMask to specify which fields to update.
    # This is crucial for partial updates.
    update_mask = field_mask_pb2.FieldMask(paths=["max_suggestions", "auto_learning"])

    # Construct the request
    request = retail_v2beta.UpdateCompletionConfigRequest(
        completion_config=completion_config,
        update_mask=update_mask,
    )

    print(f"Updating completion config for: {name}")

    try:
        response = client.update_completion_config(request=request)

        print("Completion config updated successfully:")
        print(f"  Name: {response.name}")
        print(f"  Matching Order: {response.matching_order}")
        print(f"  Max Suggestions: {response.max_suggestions}")
        print(f"  Min Prefix Length: {response.min_prefix_length}")
        print(f"  Auto Learning: {response.auto_learning}")

    except exceptions.NotFound:
        print(f"Error: Completion config not found for {name}. ")
        print("Please ensure the project, location, and catalog ID are correct.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided: {e}")
        print("Please check the values for max_suggestions, min_prefix_length, etc.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_catalogservice_completionconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a CompletionConfig in Google Cloud Retail."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the catalog.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to update the completion config for.",
    )

    args = parser.parse_args()

    update_completion_config(args.project_id, args.location, args.catalog_id)
