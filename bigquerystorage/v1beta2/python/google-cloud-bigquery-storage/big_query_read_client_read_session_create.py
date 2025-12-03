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

# [START bigquerystorage_v1beta2_bigqueryread_readsession_create]
from google.api_core.exceptions import NotFound
from google.cloud.bigquery_storage_v1beta2 import BigQueryReadClient
from google.cloud.bigquery_storage_v1beta2.types import DataFormat, ReadSession

client = BigQueryReadClient()


def create_read_session(
    project_id: str,
    dataset_id: str,
    table_id: str,
) -> None:
    """Creates a new read session for a BigQuery table.

    Args:
        project_id: The project ID that contains the table to read.
        dataset_id: The dataset ID that contains the table to read.
        table_id: The table ID of the table to read.
    """
    table = f"projects/{project_id}/datasets/{dataset_id}/tables/{table_id}"

    parent = f"projects/{project_id}"

    read_options = ReadSession.TableReadOptions(
        selected_fields=["field_01", "field_02"], row_restriction="field_03 > 100"
    )

    read_session = ReadSession(
        table=table,
        data_format=DataFormat.AVRO,
        read_options=read_options,
    )

    try:
        session = client.create_read_session(
            parent=parent,
            read_session=read_session,
            max_stream_count=1,
        )

        print(f"Read session created: {session.name}")
        print(f"Data format: {session.data_format.name}")
        print(f"AVRO schema: {session.avro_schema.schema}")
        print(f"Number of streams: {len(session.streams)}")

        if session.streams:
            print(f"First stream: {session.streams[0].name}")

    except NotFound:
        print(
            f"Table not found: '{table}'."
            "\nPlease verify that the project, dataset, and table IDs are correct."
        )


# [END bigquerystorage_v1beta2_bigqueryread_readsession_create]
