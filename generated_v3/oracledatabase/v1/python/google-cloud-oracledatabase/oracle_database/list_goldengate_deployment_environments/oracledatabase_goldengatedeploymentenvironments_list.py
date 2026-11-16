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

# [START oracledatabase_v1_oracledatabase_goldengatedeploymentenvironments_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_goldengate_deployment_environments(project_id: str, location_id: str) -> None:
    """Lists GoldenGate deployment environments in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = oracledatabase_v1.OracleDatabaseClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = oracledatabase_v1.ListGoldengateDeploymentEnvironmentsRequest(
            parent=parent,
        )
        response = client.list_goldengate_deployment_environments(request=request)

        for environment in response:
            print(f"Environment: {environment.name}")
    except google.api_core.exceptions.BadRequest as exception:
        print(f"Marketplace entitlement required: {exception.message}")
# [END oracledatabase_v1_oracledatabase_goldengatedeploymentenvironments_list]
