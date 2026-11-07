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

# [START datamigration_v1_datamigrationservice_privateconnection_get]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def get_private_connection(
    project_id: str, location_id: str, private_connection_id: str
) -> None:
    """Retrieves details of a private connection in Database Migration Service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the private connection is located.
        private_connection_id: The ID of the private connection resource to retrieve.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/privateConnections/{private_connection_id}"

    request = clouddms_v1.GetPrivateConnectionRequest(
        name=name,
    )

    try:
        response = client.get_private_connection(request=request)
        print(f"Successfully retrieved private connection: {response.name}")
        print(f"State: {response.state.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END datamigration_v1_datamigrationservice_privateconnection_get]
