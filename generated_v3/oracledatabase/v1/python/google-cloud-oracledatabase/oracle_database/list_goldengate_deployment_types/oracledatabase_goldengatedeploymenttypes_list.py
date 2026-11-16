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

# [START oracledatabase_v1_oracledatabase_goldengatedeploymenttypes_list]
from google.api_core import exceptions
from google.cloud import oracledatabase_v1


def list_goldengate_deployment_types(project_id: str, location_id: str) -> None:
    """Lists GoldenGate deployment types in a specific Google Cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListGoldengateDeploymentTypesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_goldengate_deployment_types(request=request)
        for deployment_type in page_result:
            print(f"Name: {deployment_type.name}")
            print(f"Display Name: {deployment_type.display_name}")
    except (exceptions.FailedPrecondition, exceptions.InvalidArgument) as error:
        print(f"Marketplace order required: {error.message}")
# [END oracledatabase_v1_oracledatabase_goldengatedeploymenttypes_list]
