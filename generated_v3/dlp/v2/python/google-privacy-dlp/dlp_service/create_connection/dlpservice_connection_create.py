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

# [START dlp_v2_dlpservice_connection_create]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def create_connection(project_id: str, location_id: str) -> None:
    """Create a Cloud Data Loss Prevention connection for Cloud SQL.

    Args:
        project_id: The Google Cloud project ID under which to create the connection.
        location_id: The Google Cloud region where the connection is created (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    cloud_sql_properties = dlp_v2.CloudSqlProperties(
        connection_name=f"{project_id}:{location_id}:sample-instance",
        database_engine=dlp_v2.CloudSqlProperties.DatabaseEngine.DATABASE_ENGINE_POSTGRES,
        max_connections=5,
        cloud_sql_iam=dlp_v2.CloudSqlIamCredential(),
    )

    connection = dlp_v2.Connection(
        state=dlp_v2.ConnectionState.AVAILABLE,
        cloud_sql=cloud_sql_properties,
    )

    try:
        response = client.create_connection(
            parent=parent,
            connection=connection,
        )
        print(f"Created connection: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dlp_v2_dlpservice_connection_create]
