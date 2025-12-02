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

# [START bigqueryconnection_v1_connectionservice_connection_update]
from google.api_core.exceptions import NotFound
from google.cloud.bigquery_connection_v1 import Connection, ConnectionServiceClient
from google.protobuf import field_mask_pb2


def update_connection(project_id: str, location: str, connection_id: str) -> None:
    """Updates a BigQuery connection's friendly name and description.

    For security reasons, updating connection properties also resets the
    credential. The `update_mask` specifies which fields of the connection
    to update. This sample only updates metadata fields to avoid resetting
    credentials.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the connection, e.g., "us-central1".
        connection_id: The ID of the connection to update.
    """
    client = ConnectionServiceClient()

    connection_name = client.connection_path(project_id, location, connection_id)

    connection = Connection(
        friendly_name="My Updated BigQuery Connection",
        description="This is an updated description for the connection.",
    )

    update_mask = field_mask_pb2.FieldMask(paths=["friendly_name", "description"])

    try:
        response = client.update_connection(
            name=connection_name,
            connection=connection,
            update_mask=update_mask,
        )

        print(f"Connection '{response.name}' updated successfully.")
        print(f"Friendly Name: {response.friendly_name}")
        print(f"Description: {response.description}")

    except NotFound:
        print(f"Connection '{connection_name}' not found. Please create it first.")

# [END bigqueryconnection_v1_connectionservice_connection_update]

