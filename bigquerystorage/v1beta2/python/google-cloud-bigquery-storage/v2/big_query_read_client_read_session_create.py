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

# [START bigquerystorage_v1beta2_bigqueryread_create_read_session]
from google.api_core import exceptions
from google.cloud import bigquery_storage_v1beta2


def create_bigquery_read_session(
    project_id: str,
    dataset_id: str,
    table_id: str,
) -> None:
    """
    Creates a new read session for a BigQuery table.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The ID of the BigQuery dataset.
        table_id: The ID of the BigQuery table.
    """
    client = bigquery_storage_v1beta2.BigQueryReadClient()

    table_name = client.table_path(project_id, dataset_id, table_id)
    parent_project = f"projects/{project_id}"

    read_session = bigquery_storage_v1beta2.types.ReadSession(
        data_format=bigquery_storage_v1beta2.types.DataFormat.AVRO,
        table=table_name,
        # You can specify read options, such as selected fields or row filters.
        # For example, to select specific columns:
        # read_options=bigquery_storage_v1beta2.types.ReadSession.TableReadOptions(
        #     selected_fields=["column1", "column2"]
        # )
    )

    request = bigquery_storage_v1beta2.types.CreateReadSessionRequest(
        parent=parent_project,
        read_session=read_session,
        max_stream_count=1,  # Requesting at least one stream.
    )

    try:
        session = client.create_read_session(request=request)

        print(f"Successfully created read session: {session.name}")
        print(f"Data format: {session.data_format.name}")
        print(f"Table: {session.table}")
        print(f"Number of streams created: {len(session.streams)}")
        for i, stream in enumerate(session.streams):
            print(f"  Stream {i+1} name: {stream.name}")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified table '{table_name}' was not found. "
            f"Please ensure the project, dataset, and table IDs are correct and you have "
            f"permission to access them. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerystorage_v1beta2_bigqueryread_create_read_session]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a BigQuery Storage ReadSession."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--dataset_id",
        required=True,
        help="The ID of the BigQuery dataset.",
    )
    parser.add_argument(
        "--table_id",
        required=True,
        help="The ID of the BigQuery table.",
    )

    args = parser.parse_args()

    create_bigquery_read_session(args.project_id, args.dataset_id, args.table_id)
