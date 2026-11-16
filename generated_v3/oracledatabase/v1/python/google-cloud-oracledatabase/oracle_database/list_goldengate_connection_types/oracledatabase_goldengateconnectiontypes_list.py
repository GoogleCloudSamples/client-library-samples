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

# [START oracledatabase_v1_oracledatabase_goldengateconnectiontypes_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_goldengate_connection_types(project_id: str, location_id: str) -> None:
    """Lists GoldenGate connection types available in a Google Cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListGoldengateConnectionTypesRequest(
        parent=parent,
    )

    try:
        response = client.list_goldengate_connection_types(request=request)
        for connection_type in response:
            print(f"Name: {connection_type.name}")
            print(f"Display Name: {connection_type.display_name}")
    except google.api_core.exceptions.BadRequest as error:
        if "ENTITLEMENT_NOT_FOUND" in str(error):
            print(
                "An active marketplace order is required to list GoldenGate connection types."
            )
        else:
            print(f"Bad request: {error.message}")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied: {error.message}")
    except google.api_core.exceptions.NotFound as error:
        print(f"Resource not found: {error.message}")


# [END oracledatabase_v1_oracledatabase_goldengateconnectiontypes_list]
