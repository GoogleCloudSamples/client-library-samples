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

# [START dataplex_v1_dataplexservice_update_lake]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_lake(
    project_id: str,
    location_id: str,
    lake_id: str,
) -> None:
    """Updates a Dataplex lake's display name, description, and adds a label.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., "us-central1").
        lake_id: The ID of the lake to update.
    """
    client = dataplex_v1.DataplexServiceClient()

    lake_name = client.lake_path(project_id, location_id, lake_id)

    updated_lake = dataplex_v1.Lake(
        name=lake_name,
        display_name="My new Dataplex Lake Display Name",
        description="Updated description for my Dataplex Lake",
        labels={
            "environment": "dev",  # example label
        },
    )

    # Create a FieldMask to specify which fields of the lake are to be updated.
    # Only the fields specified in the update_mask will be modified.
    # If a field is not in the update_mask, its current value will be preserved.
    update_mask = field_mask_pb2.FieldMask(
        paths=["display_name", "description", "labels"]
    )

    request = dataplex_v1.UpdateLakeRequest(
        lake=updated_lake,
        update_mask=update_mask,
    )

    print(f"Updating lake: {lake_name} with new display name and description...")

    try:
        operation = client.update_lake(request=request)
        response = operation.result()
        print(f"Successfully updated lake: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"New Description: {response.description}")
        print(f"New Labels: {response.labels}")

    except exceptions.NotFound:
        print(
            f"Error: Lake '{lake_name}' not found. Please ensure the project ID, location ID, and lake ID are correct."
        )
    except exceptions.Conflict as e:
        print(
            f"Error: Conflict occurred while updating lake '{lake_name}'. This might happen if another operation is already in progress. Details: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_update_lake]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Dataplex lake's display name and description."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake to update.",
    )
    args = parser.parse_args()

    update_lake(
        args.project_id,
        args.location_id,
        args.lake_id,
    )
