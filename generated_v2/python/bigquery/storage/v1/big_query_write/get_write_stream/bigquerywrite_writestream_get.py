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

# [START bigquerystorage_v1_bigquerywrite_writestream_get]
import google.api_core.exceptions
from google.cloud import bigquery_storage_v1


def get_write_stream(
    project_id: str, dataset_id: str, table_id: str, stream_id: str
) -> None:
    """Get information about a BigQuery write stream.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        dataset_id: ID of the Dataset (for example, 'example-dataset-id').
        table_id: ID of the Table (for example, 'example-table-id').
        stream_id: ID of the Stream (for example, 'example-stream-id').
    """
    client = bigquery_storage_v1.BigQueryWriteClient()

    name = f"projects/{project_id}/datasets/{dataset_id}/tables/{table_id}/streams/{stream_id}"

    request = bigquery_storage_v1.types.GetWriteStreamRequest(
        name=name,
        view=bigquery_storage_v1.types.WriteStreamView.FULL,
    )

    try:
        response = client.get_write_stream(request=request)
        print(f"Retrieved write stream: {response.name}")
        print(f"Stream type: {response.type_}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get write stream: {e}")
# [END bigquerystorage_v1_bigquerywrite_writestream_get]
