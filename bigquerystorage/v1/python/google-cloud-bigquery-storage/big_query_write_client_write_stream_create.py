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


# [START bigquerystorage_v1_bigquerywrite_writestream_create]
from google.api_core.exceptions import NotFound
from google.cloud.bigquery_storage_v1 import BigQueryWriteClient
from google.cloud.bigquery_storage_v1.types import WriteStream

client = BigQueryWriteClient()


def create_write_stream(project_id: str, dataset_id: str, table_id: str) -> None:
    """Creates a write stream to a BigQuery table.

    A write stream is a channel that can be used to write data to a BigQuery
    table. This sample creates a 'COMMITTED' type write stream, which means
    that data written to the stream is immediately available for query.

    Args:
        project_id: The Google Cloud project ID.
        dataset_id: The BigQuery dataset ID.
        table_id: The BigQuery table ID.
    """
    parent = client.table_path(project_id, dataset_id, table_id)
    write_stream = WriteStream()

    write_stream.type_ = WriteStream.Type.COMMITTED

    try:
        created_stream = client.create_write_stream(
            parent=parent, write_stream=write_stream
        )

        print(f"Created write stream: {created_stream.name}")

    except NotFound:
        print(
            f"Parent table not found: {parent}. Please create the table before running this sample."
        )


# [END bigquerystorage_v1_bigquerywrite_writestream_create]
