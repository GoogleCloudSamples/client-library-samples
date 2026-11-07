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

# [START serviceusage_v1_serviceusage_disable_service]
from google.api_core import exceptions
from google.cloud import service_usage_v1


def disable_service(project_id: str, service_id: str) -> None:
    """Disables a service for a specific project.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The service identifier to disable (for example,
          'serviceusage.googleapis.com').
    """
    client = service_usage_v1.ServiceUsageClient()

    name = f"projects/{project_id}/services/{service_id}"

    request = service_usage_v1.DisableServiceRequest(
        name=name,
    )

    try:
        # DisableService returns a long-running operation.
        operation = client.disable_service(request=request)
        response = operation.result()
        print(f"Service state: {response.service.state.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to disable service: {e}")
# [END serviceusage_v1_serviceusage_disable_service]
