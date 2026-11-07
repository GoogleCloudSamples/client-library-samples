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

# [START bigqueryconnection_v1_connectionservice_connection_update]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1
from google.protobuf import field_mask_pb2


def update_connection(project_id: str, location_id: str, connection_id: str) -> None:
    """Update the description of an existing BigQuery connection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        connection_id: ID of the Connection (for example, 'example-connection-id')
    """
    client = bigquery_connection_v1.ConnectionServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/connections/{connection_id}"
    connection = bigquery_connection_v1.Connection(
        description="Updated description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_connection(
            name=name,
            connection=connection,
            update_mask=update_mask,
        )
        print(f"Updated connection: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END bigqueryconnection_v1_connectionservice_connection_update]
