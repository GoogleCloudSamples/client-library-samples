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

# [START spanner_v1_spanner_sessions_batchcreate]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def batch_create_sessions(project_id: str, instance_id: str, database_id: str) -> None:
    """Creates multiple sessions concurrently in a Cloud Spanner database.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Spanner instance.
        database_id: The ID of the Cloud Spanner database.
    """
    session_count = 5
    database = client.database_path(project_id, instance_id, database_id)

    request = spanner_v1.BatchCreateSessionsRequest(
        database=database,
        session_count=session_count,
    )

    try:
        response = client.batch_create_sessions(request=request)
        print(f"Created {len(response.session)} sessions.")
        for session in response.session:
            print(f"Session name: {session.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create sessions: {e}")
# [END spanner_v1_spanner_sessions_batchcreate]
