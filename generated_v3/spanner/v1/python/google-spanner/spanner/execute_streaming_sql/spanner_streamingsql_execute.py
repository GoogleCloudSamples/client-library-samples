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

# [START spanner_v1_spanner_execute_streaming_sql]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def execute_streaming_sql(
    project_id: str, instance_id: str, database_id: str, session_id: str
) -> None:
    """Use the execute_streaming_sql method

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The caller-chosen ID of the Cloud Spanner instance.
        database_id: The caller-chosen ID of the Cloud Spanner database.
        session_id: The system-assigned ID of the Cloud Spanner session, obtained from creating a session.
    """
    session = (
        f"projects/{project_id}/instances/{instance_id}/"
        f"databases/{database_id}/sessions/{session_id}"
    )
    sql = "SELECT 1"

    request = spanner_v1.ExecuteSqlRequest(
        session=session,
        sql=sql,
    )

    try:
        response_stream = client.execute_streaming_sql(request=request)
        for partial_result_set in response_stream:
            print(f"Received chunk with {len(partial_result_set.values)} values: {list(partial_result_set.values)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error executing streaming SQL: {error}")
# [END spanner_v1_spanner_execute_streaming_sql]
