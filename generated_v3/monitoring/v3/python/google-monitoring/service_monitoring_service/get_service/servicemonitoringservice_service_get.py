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

# [START monitoring_v3_servicemonitoringservice_service_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.ServiceMonitoringServiceClient()


def get_service(service_id: str, project_id: str) -> None:
    """Retrieves a service using the ServiceMonitoringService.

    Args:
        service_id: The identifier of the Service resource, either
          user-specified or server-generated (for example, 'example-service').
        project_id: The Google Cloud project ID where the Service is hosted.
    """
    name = f"projects/{project_id}/services/{service_id}"

    try:
        response = client.get_service(name=name)
        print(f"Retrieved service: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Service not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")
# [END monitoring_v3_servicemonitoringservice_service_get]
