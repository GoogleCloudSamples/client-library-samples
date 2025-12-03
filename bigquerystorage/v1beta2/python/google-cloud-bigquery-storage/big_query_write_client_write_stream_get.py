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

# [START bigquerystorage_v1beta2_bigquerywrite_writestream_get]
from google.api_core import exceptions
from google.cloud import bigquery_storage_v1beta2

client = bigquery_storage_v1beta2.BigQueryWriteClient()


def get_write_stream(project_id: str, dataset_id: str, table_id: str) -> None:
    """Gets a write stream in a BigQuery table.

    This sample first creates a new write stream and then gets it.
    The sample also handles the NotFound error that is raised when the
    table or write stream does not exist.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The BigQuery dataset ID.
        table_id: The BigQuery table ID.
    """
    try:
        parent = client.table_path(project_id, dataset_id, table_id)

        write_stream = bigquery_storage_v1beta2.types.WriteStream()
        write_stream.type_ = bigquery_storage_v1beta2.types.WriteStream.Type.COMMITTED
        created_stream = client.create_write_stream(
            parent=parent, write_stream=write_stream
        )
        print(f"Created write stream: {created_stream.name}")

        got_stream = client.get_write_stream(name=created_stream.name)

        print(f"Got write stream: {got_stream.name}")
    except exceptions.NotFound as e:
        print(
            f"The table or write stream was not found. Please create the table and try again. \n{e}"
        )


# [END bigquerystorage_v1beta2_bigquerywrite_writestream_get]
