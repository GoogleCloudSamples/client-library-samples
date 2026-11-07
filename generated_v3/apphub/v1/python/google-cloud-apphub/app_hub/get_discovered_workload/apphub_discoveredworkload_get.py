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

# [START apphub_v1_apphub_discoveredworkload_get]
import google.api_core.exceptions
from google.cloud import apphub_v1

client = apphub_v1.AppHubClient()


def get_discovered_workload(
    project_id: str, location_id: str, discovered_workload_id: str
) -> None:
    """Gets details of an App Hub discovered workload.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        discovered_workload_id: Server-generated identifier (UUID) of the Discovered Workload.
    """
    name = f"projects/{project_id}/locations/{location_id}/discoveredWorkloads/{discovered_workload_id}"

    request = apphub_v1.GetDiscoveredWorkloadRequest(
        name=name,
    )

    try:
        response = client.get_discovered_workload(request=request)
        print(f"Discovered Workload Name: {response.name}")
        print(f"Workload Reference: {response.workload_reference.uri}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END apphub_v1_apphub_discoveredworkload_get]
