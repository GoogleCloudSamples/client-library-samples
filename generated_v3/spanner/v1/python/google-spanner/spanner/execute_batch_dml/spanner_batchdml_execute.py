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

# [START spanner_v1_spanner_execute_batch_dml]
import google.api_core.exceptions
from google.cloud import spanner_v1


def execute_batch_dml(
    project_id: str,
    instance_id: str,
    database_id: str,
    session_id: str,
) -> None:
    """Executes a batch of DML statements within a transaction.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Spanner instance.
        database_id: The ID of the Spanner database.
        session_id: The server-generated ID of the Spanner session.
    """
    client = spanner_v1.SpannerClient()

    seqno = 1
    statements = [
        spanner_v1.ExecuteBatchDmlRequest.Statement(
            sql=(
                "INSERT INTO Singers (SingerId, FirstName, LastName) "
                "VALUES (12, 'Melissa', 'Garcia')"
            )
        ),
        spanner_v1.ExecuteBatchDmlRequest.Statement(
            sql=(
                "INSERT INTO Singers (SingerId, FirstName, LastName) "
                "VALUES (13, 'Russell', 'Morales')"
            )
        ),
    ]
    transaction = spanner_v1.TransactionSelector(
        begin=spanner_v1.TransactionOptions(
            read_write=spanner_v1.TransactionOptions.ReadWrite()
        )
    )
    session = client.session_path(
        project_id, instance_id, database_id, session_id
    )

    request = spanner_v1.ExecuteBatchDmlRequest(
        session=session,
        transaction=transaction,
        statements=statements,
        seqno=seqno,
    )

    try:
        response = client.execute_batch_dml(request=request)
        print(f"Batch DML status code: {response.status.code}")
        for result_set in response.result_sets:
            print(f"Rows affected: {result_set.stats.row_count_exact}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Batch DML execution failed: {error.message}")
# [END spanner_v1_spanner_execute_batch_dml]
