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

# [START spanner_v1_spanner_streaming_read]
from google.api_core import exceptions
from google.cloud import spanner_v1


def streaming_read(
    project_id: str, instance_id: str, database_id: str, session_id: str
) -> None:
    """Reads rows from a Cloud Spanner table as a stream of partial result sets.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Spanner instance.
        database_id: The ID of the Cloud Spanner database.
        session_id: The ID of the Cloud Spanner session.
    """
    client = spanner_v1.SpannerClient()

    columns = ["SingerId", "FirstName", "LastName"]
    session = (
        f"projects/{project_id}/instances/{instance_id}"
        f"/databases/{database_id}/sessions/{session_id}"
    )
    key_set = spanner_v1.types.KeySet(all_=True)
    table = "Singers"

    request = spanner_v1.ReadRequest(
        session=session,
        table=table,
        columns=columns,
        key_set=key_set,
    )

    try:
        response_stream = client.streaming_read(request=request)
        for partial_result_set in response_stream:
            print(f"Received chunk with values: {partial_result_set.values}")
    except exceptions.GoogleAPICallError as exc:
        print(f"StreamingRead failed: {exc.message}")


# [END spanner_v1_spanner_streaming_read]
