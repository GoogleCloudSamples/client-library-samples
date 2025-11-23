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

# [START retail_v2beta_control_service_list_controls]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def list_controls(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Lists all Controls by their parent Catalog.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., 'global', 'us-central1').
        catalog_id: The ID of the catalog.
    """

    client = retail_v2beta.ControlServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    request = retail_v2beta.ListControlsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_controls(request=request)

        controls_found = False
        for response in page_result:
            controls_found = True
            print(f"Control name: {response.name}")
            print(f"  Display name: {response.display_name}")
            print(f"  Solution types: {response.solution_types}")
            if response.facet_spec:
                print(f"  Facet spec key: {response.facet_spec.facet_key.key}")
            elif response.rule:
                print(f"  Rule: {response.rule}")
            print("---")

        if not controls_found:
            print("No controls found for the specified catalog.")

    except exceptions.NotFound as e:
        print(f"Error: The specified parent catalog was not found: {parent}")
        print(f"Please ensure the project ID, location, and catalog ID are correct.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_control_service_list_controls]


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Lists all Controls by their parent Catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project. D",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog. Defaults to 'default_catalog'.",
    )

    args = parser.parse_args()

    list_controls(args.project_id, args.location, args.catalog_id)
