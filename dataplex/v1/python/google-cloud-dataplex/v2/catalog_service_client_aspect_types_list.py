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

# [START dataplex_v1_catalogservice_aspecttypes_list]
from google.api_core import exceptions as google_api_exceptions
from google.cloud import dataplex_v1


def list_aspect_types(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all AspectType resources within a given project and location.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region to list aspect types from (e.g., "us-central1").
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = dataplex_v1.ListAspectTypesRequest(parent=parent)

        print(f"Listing Aspect Types in {parent}:")
        found_types = False
        for aspect_type in client.list_aspect_types(request=request):
            found_types = True
            print(f"- Aspect Type Name: {aspect_type.name}")
            print(f"  Display Name: {aspect_type.display_name}")
            print(f"  Description: {aspect_type.description}")
            print(f"  Create Time: {aspect_type.create_time.isoformat()}")

        if not found_types:
            print(f"  No Aspect Types found for {project_id} in {location}.")

    except google_api_exceptions.NotFound:
        print(
            f"Error: The specified project '{project_id}' or location '{location}' "
            "was not found or does not exist. Please check the project ID and location."
        )
    except google_api_exceptions.PermissionDenied:
        print(
            "Error: Permission denied. Ensure the authenticated service account or user "
            "has the necessary Dataplex Catalog Viewer role (roles/dataplex.viewer) "
            f"for project '{project_id}' in location '{location}'."
        )
    except google_api_exceptions.GoogleAPIError as e:
        print(f"An unexpected Google API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_aspecttypes_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataplex Catalog AspectType resources."
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
        help="The Google Cloud region to list aspect types from (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_aspect_types(args.project_id, args.location)
