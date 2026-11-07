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

# [START monitoring_v3_servicemonitoringservice_services_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.ServiceMonitoringServiceClient()


def list_services(project_id: str) -> None:
    """List services in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListServicesRequest(parent=parent)
        page_result = client.list_services(request=request)
        for service in page_result:
            print(f"Service: {service.name} ({service.display_name})")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END monitoring_v3_servicemonitoringservice_services_list]
