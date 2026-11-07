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

# [START bigqueryconnection_v1_connectionservice_connection_delete]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1


def delete_connection(project_id: str, location_id: str, connection_id: str) -> None:
    """Deletes a BigQuery connection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        connection_id: The ID of the connection (for example, 'example-connection-id').
    """
    client = bigquery_connection_v1.ConnectionServiceClient()
    name = client.connection_path(project_id, location_id, connection_id)

    request = bigquery_connection_v1.DeleteConnectionRequest(
        name=name,
    )

    try:
        client.delete_connection(request=request)
        print(f"Deleted connection: {name}")
    except google.api_core.exceptions.NotFound as exc:
        print(f"Connection not found: {exc.message}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc.message}")
# [END bigqueryconnection_v1_connectionservice_connection_delete]
