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

# [START servicemanagement_v1_servicemanager_service_get]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1


def get_service() -> None:
    """Retrieves the configuration for a managed service."""
    client = servicemanagement_v1.ServiceManagerClient()

    service_name = "pubsub.googleapis.com"

    request = servicemanagement_v1.GetServiceRequest(
        service_name=service_name,
    )

    try:
        response = client.get_service(request=request)
        print(f"Service Name: {response.service_name}")
        print(f"Producer Project ID: {response.producer_project_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve service: {error}")


# [END servicemanagement_v1_servicemanager_service_get]
