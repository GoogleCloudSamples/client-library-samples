# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigqueryconnection_v1_connectionservice_connection_get]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1

client = bigquery_connection_v1.ConnectionServiceClient()


def get_connection(project_id: str, location: str, connection_id: str):
    """Gets a BigQuery connection.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the connection, e.g. "us-central1".
        connection_id: The ID of the connection to retrieve.
    """

    name = client.connection_path(project_id, location, connection_id)

    try:
        connection = client.get_connection(name=name)

        print(f"Successfully retrieved connection: {connection.name}")
        print(f"Friendly name: {connection.friendly_name}")
        print(f"Description: {connection.description}")
        if connection.cloud_sql:
            print(f"Cloud SQL instance ID: {connection.cloud_sql.instance_id}")
    except google.api_core.exceptions.NotFound:
        print(f"Connection '{name}' not found.")


# [END bigqueryconnection_v1_connectionservice_connection_get]
