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

# [START bigquerystorage_v1_bigqueryread_readsession_create]
import google.api_core.exceptions
from google.cloud import bigquery_storage_v1


def create_read_session(project_id: str) -> None:
    """Creates a BigQuery Read session.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = bigquery_storage_v1.BigQueryReadClient()

    parent = f"projects/{project_id}"
    read_session = bigquery_storage_v1.types.ReadSession(
        table=f"projects/{project_id}/datasets/example_dataset/tables/example_table",
        data_format=bigquery_storage_v1.types.DataFormat.ARROW,
    )

    try:
        session = client.create_read_session(
            parent=parent,
            read_session=read_session,
        )
        print(f"Session name: {session.name}")
        print(f"Number of streams: {len(session.streams)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create read session: {error}")
# [END bigquerystorage_v1_bigqueryread_readsession_create]
