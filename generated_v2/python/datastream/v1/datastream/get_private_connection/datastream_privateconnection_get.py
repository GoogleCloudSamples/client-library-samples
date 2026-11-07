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

# [START datastream_v1_datastream_privateconnection_get]
import google.api_core.exceptions
from google.cloud import datastream_v1

client = datastream_v1.DatastreamClient()


def get_private_connection(
    project_id: str, location_id: str, private_connection_id: str
) -> None:
    """Retrieves details of an existing Datastream private connection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the private connection resides.
        private_connection_id: The identifier of the Datastream private connection to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/privateConnections/{private_connection_id}"

    request = datastream_v1.GetPrivateConnectionRequest(name=name)

    try:
        response = client.get_private_connection(request=request)
        print(f"Private connection name: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve private connection: {error.message}")
# [END datastream_v1_datastream_privateconnection_get]
