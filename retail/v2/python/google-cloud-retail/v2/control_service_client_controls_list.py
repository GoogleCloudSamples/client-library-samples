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

# [START retail_v2_controlservice_controls_list]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_controls(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Lists all Controls associated with a given catalog.

    Controls are configurations that allow you to fine-tune the behavior of
    search and recommendation results in Google Cloud Retail. They can be used
    to boost or bury certain products, apply filters, or define synonyms.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
        catalog_id: The ID of the catalog to list controls from (e.g., "default_catalog").
    """
    client = retail_v2.ControlServiceClient()

    # The parent catalog resource name, for example:
    parent = client.catalog_path(project_id, location, catalog_id)

    try:
        request = retail_v2.ListControlsRequest(parent=parent)

        controls = client.list_controls(request=request)

        found_controls = False
        for control in controls:
            found_controls = True
            print(f"  Control name: {control.name}")
            print(f"  Display name: {control.display_name}")
            print(f"  Solution types: {control.solution_types}")
            print("----------------------------------------")

        if not found_controls:
            print("No controls found for this catalog.")

    except exceptions.NotFound as e:
        print(f"Error: The specified catalog '{parent}' was not found.")
        print(f"Please ensure the project ID, location, and catalog ID are correct.")
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project permissions and network connection.")


# [END retail_v2_controlservice_controls_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List controls for a Google Cloud Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to list controls from (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    list_controls(args.project_id, args.location, args.catalog_id)
