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

# [START spanner_v1_spanner_execute_sql]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def execute_sql(project_id: str, instance_id: str, database_id: str, session_id: str) -> None:
    """Use the execute_sql method

    Args:
        project_id: The Google Cloud project ID. Caller-chosen.
        instance_id: The Cloud Spanner instance ID. Caller-chosen.
        database_id: The Cloud Spanner database ID. Caller-chosen.
        session_id: The Cloud Spanner session ID. Server-generated.
    """
    sql = "SELECT 1"
    session = f"projects/{project_id}/instances/{instance_id}/databases/{database_id}/sessions/{session_id}"

    request = spanner_v1.ExecuteSqlRequest(
        session=session,
        sql=sql,
    )

    try:
        response = client.execute_sql(request=request)
        print("Query executed successfully:")
        for row in response.rows:
            print(row)
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END spanner_v1_spanner_execute_sql]
