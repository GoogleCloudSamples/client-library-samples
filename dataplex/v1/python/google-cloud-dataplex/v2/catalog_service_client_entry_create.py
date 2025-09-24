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

# [START dataplex_v1_catalogservice_entry_create]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_entry(
    project_id: str,
    location: str,
    entry_group_id: str,
    entry_id: str,
    entry_type_id: str,
) -> None:
    """
    Creates an Entry in Dataplex Universal Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the Entry Group is located.
        entry_group_id: The ID of the Entry Group to create the entry in.
        entry_id: The ID for the new Entry.
        entry_type_id: The ID of an existing EntryType to associate with this Entry.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_group_parent = client.entry_group_path(project_id, location, entry_group_id)

    entry_type_name = client.entry_type_path(project_id, location, entry_type_id)

    entry = dataplex_v1.Entry(
        entry_type=entry_type_name,
        # Example values.
        fully_qualified_name=f"bigquery:{project_id}.my_dataset.my_table",
        entry_source=dataplex_v1.EntrySource(
            resource=f"//bigquery.googleapis.com/projects/{project_id}/datasets/my_dataset/tables/my_table",
            system="BIGQUERY",
            platform="GCP",
            display_name="My BigQuery Table",
            description="A sample BigQuery table entry.",
            labels={
                "environment": "dev",
            },
        ),
    )

    request = dataplex_v1.CreateEntryRequest(
        parent=entry_group_parent,
        entry_id=entry_id,
        entry=entry,
    )

    try:
        response = client.create_entry(request=request)
        print(f"Successfully created entry: {response.name}")
        print(f"Entry Type: {response.entry_type}")
        print(f"Fully Qualified Name: {response.fully_qualified_name}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: Entry '{entry_id}' already exists in Entry Group '{entry_group_id}'."
        )
        print(f"Details: {e}")
    except exceptions.NotFound as e:
        print(
            f"Error: Parent Entry Group '{entry_group_id}' or Entry Type '{entry_type_id}' not found."
        )
        print(
            f"Please ensure the Entry Group and Entry Type exist and the paths are correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entry_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates an Entry in Dataplex Universal Catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the Entry Group is located.",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of the Entry Group to create the entry in.",
    )
    parser.add_argument(
        "--entry_id",
        type=str,
        required=True,
        help="The ID for the new Entry.",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of an existing EntryType to associate with this Entry.",
    )

    args = parser.parse_args()

    create_entry(
        args.project_id,
        args.location,
        args.entry_group_id,
        args.entry_id,
        args.entry_type_id,
    )
