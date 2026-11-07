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

# [START spanner_v1_spanner_partition_query]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def partition_query(
    project_id: str, instance_id: str, database_id: str, session_id: str
) -> None:
    """Use the partition_query method

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The Cloud Spanner instance ID.
        database_id: The Cloud Spanner database ID.
        session_id: The server-generated Cloud Spanner session ID.
    """
    session = (
        f"projects/{project_id}/instances/{instance_id}/databases/"
        f"{database_id}/sessions/{session_id}"
    )
    sql = "SELECT SingerId, AlbumId, AlbumTitle FROM Albums"
    transaction = spanner_v1.TransactionSelector(
        begin=spanner_v1.TransactionOptions(
            read_only=spanner_v1.TransactionOptions.ReadOnly(strong=True)
        )
    )

    request = spanner_v1.PartitionQueryRequest(
        session=session,
        sql=sql,
        transaction=transaction,
    )

    try:
        response = client.partition_query(request=request)
        print(f"Partitions count: {len(response.partitions)}")
        for i, partition in enumerate(response.partitions):
            print(f"Partition {i} token length: {len(partition.partition_token)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error partitioning query: {error.message}")
# [END spanner_v1_spanner_partition_query]
