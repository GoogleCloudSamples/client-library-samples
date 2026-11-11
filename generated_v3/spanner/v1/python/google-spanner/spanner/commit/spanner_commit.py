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

# [START spanner_v1_spanner_commit]
import google.api_core.exceptions
from google.cloud import spanner_v1
from google.protobuf import struct_pb2

client = spanner_v1.SpannerClient()


def commit(project_id: str, instance_id: str, database_id: str, session_id: str) -> None:
    """Commit mutations using a single-use read-write transaction.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The Cloud Spanner instance ID.
        database_id: The Cloud Spanner database ID.
        session_id: The Cloud Spanner session ID. Server-generated; obtain from a CreateSession or ListSessions call.
    """
    session = (
        f"projects/{project_id}/instances/{instance_id}/databases/{database_id}/sessions/{session_id}"
    )
    single_use_transaction = spanner_v1.TransactionOptions(
        read_write=spanner_v1.TransactionOptions.ReadWrite()
    )
    mutations = [
        spanner_v1.Mutation(
            insert=spanner_v1.Mutation.Write(
                table="Singers",
                columns=["SingerId", "FirstName", "LastName"],
                values=[
                    struct_pb2.ListValue(
                        values=[
                            struct_pb2.Value(string_value="1"),
                            struct_pb2.Value(string_value="Marc"),
                            struct_pb2.Value(string_value="Richards"),
                        ]
                    )
                ],
            )
        )
    ]

    try:
        response = client.commit(
            request=spanner_v1.CommitRequest(
                session=session,
                single_use_transaction=single_use_transaction,
                mutations=mutations,
            )
        )
        print(f"Commit completed at timestamp: {response.commit_timestamp}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Commit operation failed: {e}")
# [END spanner_v1_spanner_commit]
