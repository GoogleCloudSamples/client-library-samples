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
import logging

# [START dataplex_v1_catalogservice_aspecttype_update]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_aspect_type(
    project_id: str,
    location: str,
    aspect_type_id: str,
) -> None:
    """
    Updates an existing Dataplex AspectType.


    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region where the AspectType is located (e.g., 'us-central1').
        aspect_type_id: The ID of the AspectType to update.
    """
    client = dataplex_v1.CatalogServiceClient()

    new_display_name = "Updated Sample Aspect Type"
    new_description = "This is an updated description for the sample aspect type."

    aspect_type_name = client.aspect_type_path(project_id, location, aspect_type_id)

    aspect_type = dataplex_v1.AspectType(
        name=aspect_type_name,
        display_name=new_display_name,
        description=new_description,
    )

    # Create a FieldMask to specify which fields to update.
    # This tells the API to only modify 'display_name' and 'description',
    # leaving other fields of the AspectType unchanged.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    try:
        print(f"Updating AspectType: {aspect_type_name}...")
        operation = client.update_aspect_type(
            aspect_type=aspect_type, update_mask=update_mask
        )

        response = operation.result()
        print(f"AspectType updated successfully: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"New Description: {response.description}")

    except exceptions.NotFound:
        print(f"Error: AspectType '{aspect_type_name}' not found.")
        print(
            "Please ensure the aspect_type_id and location are correct and the AspectType exists."
        )
    except exceptions.Conflict as e:
        print(
            f"Error: Conflict occurred while updating AspectType '{aspect_type_name}'. Details: {e.message}"
        )
        print(
            "This might happen if another process is simultaneously modifying the same resource. Please try again."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"A Google API error occurred: {e.message}")
        print("Please check the error message and API documentation for more details.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_aspecttype_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Dataplex AspectType."
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
        required=True,
        help="The Google Cloud region where the AspectType is located.",
    )
    parser.add_argument(
        "--aspect_type_id",
        type=str,
        required=True,
        help="The ID of the AspectType to update.",
    )

    args = parser.parse_args()

    update_aspect_type(
        project_id=args.project_id,
        location=args.location,
        aspect_type_id=args.aspect_type_id,
    )
