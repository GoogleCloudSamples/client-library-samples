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

# [START retail_v2alpha_controlservice_controls_list]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def list_controls(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Lists all Controls by their parent Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to list controls from (e.g., "default_catalog").
    """
    client = retail_v2alpha.ControlServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    request = retail_v2alpha.ListControlsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_controls(request=request)

        control_count = 0
        for control in page_result:
            control_count += 1
            print(f"Control name: {control.name}")
            print(f"  Display name: {control.display_name}")
            print(f"  Solution types: {control.solution_types}")

        if control_count == 0:
            print("No controls found for this catalog.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified catalog '{parent}' was not found. Please ensure the project ID, location, and catalog ID are correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_controlservice_controls_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="List controls for a given catalog.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
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
        help="The ID of the catalog to list controls from (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    list_controls(args.project_id, args.location, args.catalog_id)
