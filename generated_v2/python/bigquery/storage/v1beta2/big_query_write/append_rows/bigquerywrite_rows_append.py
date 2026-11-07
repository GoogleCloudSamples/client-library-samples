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

# [START bigquerystorage_v1beta2_bigquerywrite_append_rows]
import google.api_core.exceptions
from google.cloud import bigquery_storage_v1beta2
from google.protobuf import descriptor_pb2


def append_rows(project_id: str, dataset_id: str, table_id: str) -> None:
    """Append rows to a BigQuery table using the write stream.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        dataset_id: ID of the Dataset (for example, 'example-dataset-id')
        table_id: ID of the Table (for example, 'example-table-id')
    """
    client = bigquery_storage_v1beta2.BigQueryWriteClient()

    # Note: BigQueryWrite in v1beta2 is deprecated; applications should migrate to google.cloud.bigquery.storage.v1.
    write_stream = (
        f"projects/{project_id}/datasets/{dataset_id}/tables/{table_id}/_default"
    )

    proto_descriptor = descriptor_pb2.DescriptorProto()
    proto_descriptor.name = "RowData"
    field = proto_descriptor.field.add()
    field.name = "example_field"
    field.number = 1
    field.type = descriptor_pb2.FieldDescriptorProto.TYPE_STRING

    proto_schema = bigquery_storage_v1beta2.types.ProtoSchema(
        proto_descriptor=proto_descriptor
    )

    # Wire-format serialized protobuf row matching the descriptor above.
    proto_rows = bigquery_storage_v1beta2.types.ProtoRows(
        serialized_rows=[b"\x0a\x04test"]
    )

    request = bigquery_storage_v1beta2.types.AppendRowsRequest(
        write_stream=write_stream,
        proto_rows=bigquery_storage_v1beta2.types.AppendRowsRequest.ProtoData(
            writer_schema=proto_schema,
            rows=proto_rows,
        ),
    )

    try:
        responses = client.append_rows(iter([request]))
        for response in responses:
            print(f"Appended rows response: {response}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to append rows: {exc}")
# [END bigquerystorage_v1beta2_bigquerywrite_append_rows]
