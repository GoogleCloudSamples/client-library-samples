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


# [START bigquerystorage_v1_bigquerywrite_writestream_get]
# [START bigquerystorage_bigquerywrite_writestream_get]
import google.api_core.exceptions
from google.cloud import bigquery_storage_v1


def get_write_stream(
    project_id: str, dataset_id: str, table_id: str, stream_id: str
) -> None:
    """Gets information about a single write stream.

    Args:
        project_id: The project id.
        dataset_id: The dataset id
        table_id: The table id
        stream_id: The stream id
    """
    client = bigquery_storage_v1.BigQueryWriteClient()
    stream_name = (
        f"projects/{project_id}/datasets/{dataset_id}"
        f"/tables/{table_id}/streams/{stream_id}"
    )

    try:
        stream = client.get_write_stream(name=stream_name)

        print(f"Got write stream: {stream.name}")
        print(f"Stream type: {stream.Type(stream.type_).name}")

    except google.api_core.exceptions.NotFound:
        print(f"Write stream not found: {stream_name}")


# [END bigquerystorage_bigquerywrite_writestream_get]
# [END bigquerystorage_v1_bigquerywrite_writestream_get]
