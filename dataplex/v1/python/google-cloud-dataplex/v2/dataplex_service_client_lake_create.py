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

# [START dataplex_v1_dataplexservice_create_lake]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_lake(
    project_id: str,
    location: str,
    lake_id: str,
) -> None:
    """
    Creates a Dataplex lake resource.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake will be created (e.g., 'us-central1').
        lake_id: The ID of the lake to create.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    lake = dataplex_v1.Lake(
        display_name=f"My Example Lake {lake_id}",
        description="A sample Dataplex lake created via Python client library.",
    )

    request = dataplex_v1.CreateLakeRequest(
        parent=parent,
        lake_id=lake_id,
        lake=lake,
    )

    try:
        print(
            f"Creating lake '{lake_id}' in project '{project_id}' and location '{location}'..."
        )
        operation = client.create_lake(request=request)

        response = operation.result()

        print(f"Lake '{response.name}' created successfully.")
        print(f"Lake Display Name: {response.display_name}")
        print(f"Lake Description: {response.description}")
        print(f"Lake State: {response.state.name}")

    except exceptions.Conflict as e:
        print(
            f"Error: Lake '{lake_id}' already exists. Please choose a unique lake ID. Details: {e}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: The specified parent location '{parent}' was not found or is invalid. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_create_lake]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a Dataplex lake resource.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the lake will be created (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake to create.",
    )
    args = parser.parse_args()

    create_lake(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
    )
