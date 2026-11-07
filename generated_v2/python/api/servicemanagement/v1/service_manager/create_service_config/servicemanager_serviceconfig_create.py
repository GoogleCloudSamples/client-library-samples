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

# [START servicemanagement_v1_servicemanager_serviceconfig_create]
from google.api import service_pb2
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def create_service_config(service_name: str) -> None:
    """Creates a service configuration version for a managed service.

    Args:
        service_name: The name of the service to create a configuration for
            (for example, example.googleapis.com).
    """
    try:
        # Retrieve the managed service to obtain its producer project ID.
        service = client.get_service(
            request=servicemanagement_v1.GetServiceRequest(
                service_name=service_name
            )
        )

        service_config = service_pb2.Service(
            name=service_name,
            title="Example Service Configuration",
            producer_project_id=service.producer_project_id,
        )

        request = servicemanagement_v1.CreateServiceConfigRequest(
            service_name=service_name,
            service_config=service_config,
        )

        response = client.create_service_config(request=request)
        print(f"Created service configuration: {response.name}")
        print(f"Configuration ID: {response.id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Service configuration creation failed: {e}")
# [END servicemanagement_v1_servicemanager_serviceconfig_create]
