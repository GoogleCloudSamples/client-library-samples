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

# [START dataplex_v1_metadataservice_list_partitions]
from google.api_core import exceptions
from google.cloud import dataplex_v1

def list_dataplex_partitions(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
    entity_id: str,
) -> None:
    """
    Lists metadata partitions of an entity in Google Cloud Dataplex.

    This sample demonstrates how to retrieve a list of partitions associated
    with a specific entity within a Dataplex zone. Partitions are used to
    organize data within an entity, often based on time or other categorical
    attributes.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake and zone are located.
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource.
        entity_id: The ID of the entity resource.
    """
    # For a copy-paste-callable example, hardcode the arguments.
    # project_id = "your-project-id"
    # location = "us-central1"
    # lake_id = "your-lake-id"
    # zone_id = "your-zone-id"
    # entity_id = "your-entity-id"

    # Initialize the Dataplex Metadata Service client.
    # The client is created within a 'with' statement to ensure resources are properly released.
    with dataplex_v1.MetadataServiceClient() as client:
        # Construct the full resource name for the parent entity.
        # This name uniquely identifies the entity whose partitions we want to list.
        parent = client.entity_path(
            project=project_id,
            location=location,
            lake=lake_id,
            zone=zone_id,
            entity=entity_id,
        )

        # Create the ListPartitionsRequest. No specific filters are applied in this example,
        # so all partitions for the entity will be listed.
        request = dataplex_v1.ListPartitionsRequest(parent=parent)

        try:
            # Make the API request to list partitions. The response is a pager object,
            # which allows iterating through all results across multiple pages.
            page_result = client.list_partitions(request=request)

            print(f"Partitions for entity '{entity_id}':")
            found_partitions = False
            for partition in page_result:
                found_partitions = True
                print(f"- Partition Name: {partition.name}")
                print(f"  Values: {', '.join(partition.values)}")
                print(f"  Location: {partition.location}")

            if not found_partitions:
                print(f"No partitions found for entity '{entity_id}'.")

        except exceptions.NotFound as e:
            # Handle cases where the specified parent entity does not exist.
            print(
                f"Error: The specified entity '{parent}' was not found. "
                f"Please check the project ID, location, lake ID, zone ID, and entity ID."
            )
            logging.error("NotFound error: %s", e)
        except exceptions.GoogleAPICallError as e:
            # Handle other API-related errors. This can include permission issues,
            # invalid arguments not caught by client-side validation, etc.
            print(f"An API error occurred: {e}")
            logging.error("GoogleAPICallError: %s", e)
        except Exception as e:
            # Catch any other unexpected errors during the API call.
            print(f"An unexpected error occurred: {e}")
            logging.error("An unexpected error occurred: %s", e)

# [END dataplex_v1_metadataservice_list_partitions]


if __name__ == "__main__":
    # Configure logging for better error visibility.
    logging.basicConfig(level=logging.INFO)

    parser = argparse.ArgumentParser(
        description="Lists metadata partitions of a Dataplex entity."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID. (e.g., 'your-project-id')",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the lake and zone are located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of your Dataplex Lake. (e.g., 'your-lake-id')",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of your Dataplex Zone. (e.g., 'your-zone-id')",
    )
    parser.add_argument(
        "--entity_id",
        type=str,
        required=True,
        help="The ID of the Dataplex Entity. (e.g., 'your-entity-id')",
    )

    args = parser.parse_args()

    list_dataplex_partitions(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        entity_id=args.entity_id,
    )
