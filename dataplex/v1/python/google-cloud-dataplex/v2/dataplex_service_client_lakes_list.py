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

# [START dataplex_v1_dataplexservice_lakes_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_lakes(
    project_id: str,
    location: str,
) -> None:
    """Lists all Dataplex lakes in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us-central1").
    """
    client = dataplex_v1.DataplexServiceClient()
    parent_path = client.common_location_path(project_id, location)

    try:
        request = dataplex_v1.ListLakesRequest(parent=parent_path)

        page_result = client.list_lakes(request=request)

        found_lakes = False
        for lake in page_result:
            print(f"Found lake: {lake.name} (Display Name: {lake.display_name})")
            found_lakes = True

        if not found_lakes:
            print(
                f"No lakes found in project '{project_id}' and location '{location}'."
            )

    except exceptions.NotFound as e:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' "
            f"does not exist or is inaccessible. Details: {e}"
        )
    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied to list lakes in project '{project_id}' "
            f"and location '{location}'. Please check your IAM permissions. Details: {e}"
        )
    except exceptions.GoogleAPIError as e:
        print(f"An unexpected API error occurred: {e}")


# [END dataplex_v1_dataplexservice_lakes_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataplex lakes in a given project and location."
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
        required=True,
        help="The Google Cloud location (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_lakes(args.project_id, args.location)
