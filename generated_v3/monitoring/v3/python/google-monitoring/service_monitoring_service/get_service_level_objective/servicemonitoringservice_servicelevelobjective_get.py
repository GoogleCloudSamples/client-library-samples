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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.ServiceMonitoringServiceClient()


def get_service_level_objective(
    service_id: str, project_id: str, service_level_objective_id: str
) -> None:
    """Use the get_service_level_objective method.

    Args:
        service_id: The ID of the Service (for example, 'example-service').
        project_id: The Google Cloud project ID.
        service_level_objective_id: The ID of the ServiceLevelObjective to retrieve.
    """
    name = f"projects/{project_id}/services/{service_id}/serviceLevelObjectives/{service_level_objective_id}"

    try:
        response = client.get_service_level_objective(name=name)
        print(f"Retrieved Service Level Objective: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Goal: {response.goal}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve Service Level Objective: {e}")
# [END monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
