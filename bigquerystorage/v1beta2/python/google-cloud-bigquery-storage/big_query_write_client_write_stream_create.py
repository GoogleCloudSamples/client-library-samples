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

# [START bigquerystorage_v1beta2_bigquerywrite_writestream_create]
from google.api_core import exceptions
from google.cloud import bigquery_storage_v1beta2

def create_write_stream(project_id: str, dataset_id: str, table_id: str) -> None:
    """Creates a new write stream for a BigQuery table.

    A write stream is a destination for writing data to a BigQuery table.
    This sample creates a 'COMMITTED' type write stream, which means that
    data written to the stream is immediately available for query.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The BigQuery dataset ID.
        table_id: The BigQuery table ID.
    """
    client = bigquery_storage_v1beta2.BigQueryWriteClient()
    parent = client.table_path(project_id, dataset_id, table_id)
    write_stream = bigquery_storage_v1beta2.types.WriteStream(
        type_=bigquery_storage_v1beta2.types.WriteStream.Type.COMMITTED
    )

    try:
        response = client.create_write_stream(
            parent=parent, write_stream=write_stream
        )

        print(f"Created write stream: {response.name}")

    except exceptions.NotFound:
        print(f"Table '{parent}' not found. Please create the table before running this sample.")
# [END bigquerystorage_v1beta2_bigquerywrite_writestream_create]
