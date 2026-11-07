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

# [START bigqueryconnection_v1_connectionservice_connection_get]
from google.api_core import exceptions
from google.cloud import bigquery_connection_v1


def get_connection(project_id: str, location_id: str, connection_id: str) -> None:
    """Gets a BigQuery connection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        connection_id: The ID of the connection (for example, 'example-connection-id').
    """
    client = bigquery_connection_v1.ConnectionServiceClient()
    name = client.connection_path(project_id, location_id, connection_id)

    try:
        response = client.get_connection(name=name)
        print(f"Retrieved connection: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END bigqueryconnection_v1_connectionservice_connection_get]
