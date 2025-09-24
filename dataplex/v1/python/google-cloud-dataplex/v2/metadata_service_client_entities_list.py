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

# [START dataplex_v1_metadataservice_entities_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_dataplex_entities(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """
    Lists metadata entities within a specified Dataplex zone.


    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., 'us-central1').
        lake_id: The ID of the Dataplex lake.
        zone_id: The ID of the Dataplex zone within the lake.
    """
    client = dataplex_v1.MetadataServiceClient()

    parent = client.zone_path(project_id, location, lake_id, zone_id)

    request = dataplex_v1.ListEntitiesRequest(
        parent=parent,
        view=dataplex_v1.ListEntitiesRequest.EntityView.ENTITY_VIEW_UNSPECIFIED,
    )

    try:
        page_result = client.list_entities(request=request)

        print(f"Listing entities in zone: {parent}")
        found_entities = False
        for entity in page_result:
            found_entities = True
            print(f"  Entity Name: {entity.name}")
            print(f"  Entity ID: {entity.id}")
            print(f"  Entity Type: {entity.type_.name}")
            print(f"  Data Path: {entity.data_path}")
            print(f"  System: {entity.system.name}")
            print("---")

        if not found_entities:
            print("No entities found in the specified zone.")

    except exceptions.NotFound:
        print(
            f"Error: The specified zone '{parent}' or its parent lake/project was not found.\n"
            "Please ensure the project ID, location, lake ID, and zone ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_metadataservice_entities_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists metadata entities within a Dataplex zone."
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
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the Dataplex lake.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the Dataplex zone within the lake.",
    )

    args = parser.parse_args()

    list_dataplex_entities(
        args.project_id,
        args.location,
        args.lake_id,
        args.zone_id,
    )
