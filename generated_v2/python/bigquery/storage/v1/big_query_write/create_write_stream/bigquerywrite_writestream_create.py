# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigquerystorage_v1_bigquerywrite_writestream_create]
from google.api_core import exceptions
from google.cloud import bigquery_storage_v1


def create_write_stream(project_id: str, dataset_id: str, table_id: str) -> None:
    """Create a write stream for a BigQuery table.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        dataset_id: ID of the dataset (for example, 'example-dataset-id').
        table_id: ID of the table (for example, 'example-table-id').
    """
    client = bigquery_storage_v1.BigQueryWriteClient()

    parent = client.table_path(project_id, dataset_id, table_id)
    write_stream = bigquery_storage_v1.types.WriteStream(
        type_=bigquery_storage_v1.types.WriteStream.Type.COMMITTED
    )

    try:
        response = client.create_write_stream(
            parent=parent,
            write_stream=write_stream,
        )
        print(f"Created write stream: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create write stream: {e}")
# [END bigquerystorage_v1_bigquerywrite_writestream_create]
