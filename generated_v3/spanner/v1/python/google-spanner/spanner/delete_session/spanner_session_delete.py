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

# [START spanner_v1_spanner_session_delete]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def delete_session(project_id: str, instance_id: str, database_id: str, session_id: str) -> None:
    """Deletes an active Cloud Spanner session.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The Cloud Spanner instance ID.
        database_id: The Cloud Spanner database ID.
        session_id: The server-generated Cloud Spanner session ID.
    """
    name = f"projects/{project_id}/instances/{instance_id}/databases/{database_id}/sessions/{session_id}"

    request = spanner_v1.DeleteSessionRequest(name=name)

    try:
        client.delete_session(request=request)
        print(f"Deleted session: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Session not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END spanner_v1_spanner_session_delete]
