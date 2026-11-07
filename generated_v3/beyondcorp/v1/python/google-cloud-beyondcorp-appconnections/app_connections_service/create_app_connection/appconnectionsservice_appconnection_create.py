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

# [START beyondcorp_v1_appconnectionsservice_appconnection_create]
import google.api_core.exceptions
from google.cloud import beyondcorp_appconnections_v1


def create_app_connection(
    project_id: str, location_id: str, app_connection_id: str
) -> None:
    """Creates a BeyondCorp AppConnection in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the AppConnection is created (for example, 'us-central1').
        app_connection_id: Caller-chosen identifier for the AppConnection (for example, 'example-connection').
    """
    client = beyondcorp_appconnections_v1.AppConnectionsServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    app_connection = beyondcorp_appconnections_v1.AppConnection(
        type_=beyondcorp_appconnections_v1.AppConnection.Type.TCP_PROXY,
        application_endpoint=beyondcorp_appconnections_v1.AppConnection.ApplicationEndpoint(
            host="app.example.com",
            port=443,
        ),
    )

    try:
        # CreateAppConnection initiates a long-running operation.
        operation = client.create_app_connection(
            parent=parent,
            app_connection_id=app_connection_id,
            app_connection=app_connection,
        )
        # Block until the long-running operation finishes.
        response = operation.result()
        print(f"Created AppConnection: {response.name}")
    except google.api_core.exceptions.MethodNotImplemented:
        # AppConnectionsService is deprecated; resource creation is not permitted.
        print(
            f"AppConnection creation is not supported as the service is deprecated: {app_connection_id}"
        )
    except google.api_core.exceptions.AlreadyExists:
        print(f"AppConnection already exists: {app_connection_id}")


# [END beyondcorp_v1_appconnectionsservice_appconnection_create]
