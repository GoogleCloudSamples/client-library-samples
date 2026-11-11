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

# [START servicemanagement_v1_servicemanager_service_create]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def create_service(project_id: str, service_id: str) -> None:
    """Creates a new managed service.

    Args:
        project_id: The ID of the existing Google Cloud project that produces and owns this service.
        service_id: The caller-chosen DNS-formatted name of the service to create (for example, 'example.endpoints.cloud.goog').
    """
    service = servicemanagement_v1.ManagedService(
        service_name=service_id,
        producer_project_id=project_id,
    )

    try:
        # CreateService returns a long-running operation
        operation = client.create_service(service=service)
        response = operation.result()
        print(f"Created service: {response.service_name}")
    except google.api_core.exceptions.GoogleAPICallError as exception:
        print(f"Failed to create service: {exception}")
# [END servicemanagement_v1_servicemanager_service_create]
