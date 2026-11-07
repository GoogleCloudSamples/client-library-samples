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

# [START oracledatabase_v1_oracledatabase_goldengateconnectionassignment_create]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def create_goldengate_connection_assignment(
    project_id: str,
    location_id: str,
    goldengate_connection_assignment_id: str,
    goldengate_connection_id: str,
    goldengate_deployment_id: str,
) -> None:
    """Creates a GoldenGate connection assignment in Oracle Database@Google Cloud.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        goldengate_connection_assignment_id: The caller-chosen ID of the GoldenGate Connection Assignment to create (for example, 'example-assignment-id').
        goldengate_connection_id: The ID of the existing GoldenGate Connection to assign.
        goldengate_deployment_id: The ID of the existing GoldenGate Deployment to assign the connection to.
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    goldengate_connection = (
        f"projects/{project_id}/locations/{location_id}/goldengateConnections/"
        f"{goldengate_connection_id}"
    )
    goldengate_deployment = (
        f"projects/{project_id}/locations/{location_id}/goldengateDeployments/"
        f"{goldengate_deployment_id}"
    )

    goldengate_connection_assignment = (
        oracledatabase_v1.GoldengateConnectionAssignment(
            properties=oracledatabase_v1.GoldengateConnectionAssignmentProperties(
                goldengate_connection=goldengate_connection,
                goldengate_deployment=goldengate_deployment,
            )
        )
    )

    try:
        operation = client.create_goldengate_connection_assignment(
            parent=parent,
            goldengate_connection_assignment_id=goldengate_connection_assignment_id,
            goldengate_connection_assignment=goldengate_connection_assignment,
        )
        response = operation.result()
        print(f"Created GoldenGate connection assignment: {response.name}")
    except google.api_core.exceptions.BadRequest as e:
        if "ENTITLEMENT_NOT_FOUND" in str(e):
            print(
                "Provisioning requires an active marketplace order for Oracle Database."
            )
        else:
            print(f"Bad request received: {e.message}")
    except google.api_core.exceptions.AlreadyExists as e:
        print(f"Assignment already exists: {e.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API operation incomplete: {e.message}")
# [END oracledatabase_v1_oracledatabase_goldengateconnectionassignment_create]
