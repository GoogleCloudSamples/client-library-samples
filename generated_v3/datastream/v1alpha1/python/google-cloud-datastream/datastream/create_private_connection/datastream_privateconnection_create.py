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

# [START datastream_v1alpha1_datastream_privateconnection_create]
import google.api_core.exceptions
from google.cloud import datastream_v1alpha1


def create_private_connection(
    private_connection_id: str, project_id: str, location_id: str
) -> None:
    """Creates a private connection in Datastream.

    Args:
        private_connection_id: Caller-chosen identifier for the private connection.
        project_id: Google Cloud project ID.
        location_id: Google Cloud region or location ID.
    """
    client = datastream_v1alpha1.DatastreamClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    private_connection = datastream_v1alpha1.PrivateConnection(
        display_name="Example Private Connection",
        vpc_peering_config=datastream_v1alpha1.VpcPeeringConfig(
            vpc_name=f"projects/{project_id}/global/networks/default",
            subnet="10.0.0.0/29",
        ),
    )

    try:
        operation = client.create_private_connection(
            parent=parent,
            private_connection_id=private_connection_id,
            private_connection=private_connection,
        )
        response = operation.result()
        print(f"Created private connection: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END datastream_v1alpha1_datastream_privateconnection_create]
