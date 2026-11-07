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

# [START monitoring_v3_servicemonitoringservice_service_create]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_service(service_id: str, project_id: str) -> None:
    """Creates a custom service in the specified project.

    Args:
        service_id: The service identifier to assign to the service.
        project_id: The Google Cloud project ID hosting the Metrics Scope.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    parent = f"projects/{project_id}"
    service = monitoring_v3.Service(
        display_name="Example Custom Service",
        custom={},
    )
    request = monitoring_v3.CreateServiceRequest(
        parent=parent,
        service_id=service_id,
        service=service,
    )

    try:
        response = client.create_service(request=request)
        print(f"Created service: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create service: {error}")
# [END monitoring_v3_servicemonitoringservice_service_create]
