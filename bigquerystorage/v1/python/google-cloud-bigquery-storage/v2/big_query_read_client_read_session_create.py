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

# [START bigquerystorage_v1_bigqueryread_readsession_create]
from google.api_core import exceptions as api_exceptions
from google.cloud import bigquery_storage_v1


def create_bigquery_read_session(
    project_id: str,
    dataset_id: str,
    table_id: str,
) -> None:
    """
    Creates a new BigQuery read session for a specified table.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The ID of the BigQuery dataset.
        table_id: The ID of the BigQuery table.
    """
    client = bigquery_storage_v1.BigQueryReadClient()

    table_path = client.table_path(project_id, dataset_id, table_id)

    requested_session = bigquery_storage_v1.types.ReadSession(
        table=table_path,
        data_format=bigquery_storage_v1.types.DataFormat.AVRO,  # Or ARROW
        read_options=bigquery_storage_v1.types.ReadSession.TableReadOptions(
            # Optionally, specify a subset of columns to read.
            # selected_fields=["name", "state", "year", "num_babies"],
            # Optionally, specify a row filter.
            # row_restriction="year >= 2000 AND state = 'TX'",
        ),
    )

    request = bigquery_storage_v1.types.CreateReadSessionRequest(
        parent=f"projects/{project_id}",
        read_session=requested_session,
        max_stream_count=1,
    )

    try:
        session = client.create_read_session(request=request)

        print(f"Successfully created read session: {session.name}")
        print(f"Table: {session.table}")
        print(f"Data format: {session.data_format.name}")
        print(f"Estimated row count: {session.estimated_row_count}")
        print(f"Number of streams: {len(session.streams)}")
        for i, stream in enumerate(session.streams):
            print(f"  Stream {i + 1}: {stream.name}")
        print(f"Session will expire at: {session.expire_time.isoformat()}")

    except api_exceptions.NotFound as e:
        print(f"Error: The specified table or project was not found: {e}")
        print("Please check the project ID, dataset ID, and table ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerystorage_v1_bigqueryread_readsession_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a BigQuery read session.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--dataset_id",
        type=str,
        required=True,
        help="The ID of the BigQuery dataset.",
    )
    parser.add_argument(
        "--table_id",
        type=str,
        required=True,
        help="The ID of the BigQuery table. Default: usa_1910_2013",
    )

    args = parser.parse_args()

    create_bigquery_read_session(args.project_id, args.dataset_id, args.table_id)
