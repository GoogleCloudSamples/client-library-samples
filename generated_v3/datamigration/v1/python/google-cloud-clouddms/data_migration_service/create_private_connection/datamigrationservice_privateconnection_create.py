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

# [START datamigration_v1_datamigrationservice_privateconnection_create]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def create_private_connection(
    private_connection_id: str,
    project_id: str,
    location_id: str,
    network_id: str,
) -> None:
    """Creates a private connection in Database Migration Service.

    Args:
        private_connection_id: The caller-chosen identifier for the private
          connection.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
        network_id: The ID of an existing VPC network to peer with.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    private_connection = clouddms_v1.PrivateConnection(
        display_name="Sample Private Connection",
        vpc_peering_config=clouddms_v1.VpcPeeringConfig(
            vpc_name=f"projects/{project_id}/global/networks/{network_id}",
            subnet="10.0.0.0/29",
        ),
    )

    try:
        operation = client.create_private_connection(
            parent=parent,
            private_connection_id=private_connection_id,
            private_connection=private_connection,
        )
        print(f"Initiated private connection creation: {operation.operation.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create private connection: {error.message}")
# [END datamigration_v1_datamigrationservice_privateconnection_create]
