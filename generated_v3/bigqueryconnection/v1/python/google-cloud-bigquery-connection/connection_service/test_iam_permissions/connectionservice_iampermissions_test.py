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

# [START bigqueryconnection_v1_connectionservice_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1


def test_iam_permissions(
    project_id: str, location_id: str, connection_id: str
) -> None:
    """Tests IAM permissions on a BigQuery connection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the connection
          (for example, 'us-central1' or 'US').
        connection_id: The identifier of the connection.
    """
    client = bigquery_connection_v1.ConnectionServiceClient()

    permissions = ["bigquery.connections.get", "bigquery.connections.update"]
    resource = (
        f"projects/{project_id}/locations/{location_id}/connections/{connection_id}"
    )

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Allowed permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Failed to test IAM permissions: {exc}")
# [END bigqueryconnection_v1_connectionservice_test_iam_permissions]
