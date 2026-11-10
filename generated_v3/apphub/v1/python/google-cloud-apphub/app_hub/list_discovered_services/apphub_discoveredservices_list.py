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

# [START apphub_v1_apphub_discoveredservices_list]
import google.api_core.exceptions
from google.cloud import apphub_v1

client = apphub_v1.AppHubClient()


def list_discovered_services(project_id: str, location_id: str) -> None:
    """Lists discovered services in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = apphub_v1.ListDiscoveredServicesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_discovered_services(request=request)
        for service in page_result:
            print(f"Service: {service.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list discovered services: {e}")
# [END apphub_v1_apphub_discoveredservices_list]
