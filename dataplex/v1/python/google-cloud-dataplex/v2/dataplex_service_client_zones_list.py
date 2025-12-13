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


# [START dataplex_v1_dataplexservice_zones_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1

def list_zones(
    project_id: str,
    location_id: str,
    lake_id: str,
) -> None:
    """
    Lists all Dataplex zones within a specified lake.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., "us-central1").
        lake_id: The ID of the Dataplex lake.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = client.lake_path(project_id, location_id, lake_id)

    request = dataplex_v1.ListZonesRequest(parent=parent)

    try:
        page_result = client.list_zones(request=request)

        print(f"Zones in lake {lake_id}:")
        found_zones = False
        for zone in page_result:
            found_zones = True
            print(f"- Zone name: {zone.name} (Type: {zone.type_.name})")
            print(f"  Description: {zone.description}")
            print(f"  State: {zone.state.name}")

        if not found_zones:
            print(f"  No zones found in lake {lake_id}.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified lake '{lake_id}' or its parent resources were not found.\n"
            f"Please ensure the project ID, location ID, and lake ID are correct and the lake exists.\n"
            f"Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END dataplex_v1_dataplexservice_zones_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataplex zones within a specified lake."
    )
    parser.add_argument(
        "--project_id",
        type=str, required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,required=True,
        help="The ID of the Dataplex lake.",
    )
    args = parser.parse_args()

    list_zones(args.project_id, args.location_id, args.lake_id)
