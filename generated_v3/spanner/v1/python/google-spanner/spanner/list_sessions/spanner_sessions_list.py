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

# [START spanner_v1_spanner_sessions_list]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def list_sessions(project_id: str, instance_id: str, database_id: str) -> None:
    """List Cloud Spanner sessions for a specific database.

    Args:
        project_id: The Google Cloud project ID hosting the Spanner instance.
        instance_id: The ID of the Spanner instance. Caller-chosen upon instance creation.
        database_id: The ID of the Spanner database. Caller-chosen upon database creation.
    """
    database = f"projects/{project_id}/instances/{instance_id}/databases/{database_id}"

    request = spanner_v1.ListSessionsRequest(database=database)

    try:
        page_result = client.list_sessions(request=request)
        for session in page_result:
            print(f"Session name: {session.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END spanner_v1_spanner_sessions_list]
