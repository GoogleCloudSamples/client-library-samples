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

# [START spanner_v1_spanner_session_get]
import google.api_core.exceptions
from google.cloud import spanner_v1

client = spanner_v1.SpannerClient()


def get_session(
    project_id: str, instance_id: str, database_id: str, session_id: str
) -> None:
    """Use the get_session method

    Args:
        project_id: The ID of the Google Cloud project.
        instance_id: The caller-chosen identifier of the Cloud Spanner instance.
        database_id: The caller-chosen identifier of the Cloud Spanner database.
        session_id: The server-generated identifier of the Cloud Spanner session.
    """
    name = client.session_path(project_id, instance_id, database_id, session_id)

    request = spanner_v1.GetSessionRequest(name=name)

    try:
        response = client.get_session(request=request)
        print(f"Session retrieved: {response.name}")
        print(f"Approximate last use time: {response.approximate_last_use_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve session: {error}")


# [END spanner_v1_spanner_session_get]
