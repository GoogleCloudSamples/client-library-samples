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

# [START datastream_v1_datastream_privateconnection_create]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import datastream_v1


def create_private_connection(private_connection_id: str) -> None:
    """Creates a private connection in Datastream.

    Args:
        private_connection_id: The identifier for the private connection (for example, 'example-private-connection-id').
    """
    client = datastream_v1.DatastreamClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        _, project_id = google.auth.default()
    if not project_id:
        project_id = "example-project-id"

    location = (
        os.environ.get("GOOGLE_CLOUD_REGION")
        or os.environ.get("LOCATION")
        or "us-central1"
    )
    parent = f"projects/{project_id}/locations/{location}"

    vpc_name = (
        os.environ.get("VPC_NAME")
        or os.environ.get("NETWORK_NAME")
        or os.environ.get("VPC")
        or "default"
    )
    if vpc_name.startswith("projects/"):
        vpc_path = vpc_name
    else:
        vpc_path = f"projects/{project_id}/global/networks/{vpc_name}"

    subnet = os.environ.get("SUBNET_RANGE", "10.0.0.0/29")

    private_connection = datastream_v1.PrivateConnection(
        display_name="Example Private Connection",
        vpc_peering_config=datastream_v1.VpcPeeringConfig(
            vpc=vpc_path,
            subnet=subnet,
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
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create private connection: {error}")
# [END datastream_v1_datastream_privateconnection_create]
