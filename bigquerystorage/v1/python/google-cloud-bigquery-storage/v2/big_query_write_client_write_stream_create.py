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

# [START bigquerystorage_v1_bigquerywrite_create_write_stream]
from google.api_core import exceptions
from google.cloud import bigquery_storage_v1
from google.cloud.bigquery_storage_v1 import types


def create_bigquery_write_stream(
    project_id: str, dataset_id: str, table_id: str
) -> None:
    """Creates a new write stream for a BigQuery table.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The ID of the BigQuery dataset.
        table_id: The ID of the BigQuery table.
    """
    client = bigquery_storage_v1.BigQueryWriteClient()

    parent_table = client.table_path(project_id, dataset_id, table_id)

    write_stream = types.WriteStream(
        type_=types.WriteStream.Type.PENDING,
        write_mode=types.WriteStream.WriteMode.INSERT,
    )

    request = types.CreateWriteStreamRequest(
        parent=parent_table,
        write_stream=write_stream,
    )

    try:
        response = client.create_write_stream(request=request)

        print(f"Successfully created write stream: {response.name}")
        print(f"Stream type: {response.type_.name}")
        print(f"Stream write mode: {response.write_mode.name}")
        if response.table_schema:
            print(f"Table schema: {response.table_schema}")
        else:
            print("Table schema not included in response (default view is BASIC).")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified table '{parent_table}' was not found. "
            f"Please ensure the project ID, dataset ID, and table ID are correct "
            f"and that you have the necessary permissions. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerystorage_v1_bigquerywrite_create_write_stream]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new write stream for a BigQuery table."
    )
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
        help="The ID of the BigQuery table.",
    )

    args = parser.parse_args()

    create_bigquery_write_stream(args.project_id, args.dataset_id, args.table_id)
