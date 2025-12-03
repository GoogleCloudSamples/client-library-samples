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

# [START bigquerystorage_v1_bigqueryread_readsession_create]
from google.api_core.exceptions import NotFound
from google.cloud.bigquery_storage_v1 import BigQueryReadClient
from google.cloud.bigquery_storage_v1.types import DataFormat, ReadSession


def create_read_session(
    project_id: str,
    dataset_id: str,
    table_id: str,
) -> None:
    """Creates a read session for a BigQuery table.

    Args:
        project_id: The project ID that will be billed for the read session.
        dataset_id: The dataset ID of the table to read from.
        table_id: The table ID of the table to read from.
    """

    client = BigQueryReadClient()

    parent = f"projects/{project_id}"
    table = client.table_path(project_id, dataset_id, table_id)

    # If no fields are specified, all fields will be returned.
    read_options = ReadSession.TableReadOptions(
        selected_fields=["field_01", "field_02"],
        row_restriction="field_03 > 100"
    )

    read_session = ReadSession(
        table=table,
        data_format=DataFormat.ARROW,
        read_options=read_options,
    )

    try:
        session = client.create_read_session(
            parent=parent,
            read_session=read_session,
            max_stream_count=1,
        )

        print(f"Successfully created read session: {session.name}")
        if session.streams:
            print(f"Stream found: {session.streams[0].name}")
        else:
            print("No streams found in the session.")

    except NotFound:
        print(
            f"Could not find the table '{table}'. Please check that the table exists."
        )


# [END bigquerystorage_v1_bigqueryread_readsession_create]
