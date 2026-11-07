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

# [START apphub_v1_apphub_lookup_discovered_workload]
import google.api_core.exceptions
from google.cloud import apphub_v1

client = apphub_v1.AppHubClient()


def lookup_discovered_workload(project_id: str, location_id: str, uri: str) -> None:
    """Looks up a discovered workload in App Hub by its underlying compute resource URI.

    Args:
        project_id: The Google Cloud host project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the discovered workload resides (for example, 'us-central1').
        uri: Resource URI of the underlying compute resource to find the Discovered Workload for (accepts both project number and project ID).
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = apphub_v1.LookupDiscoveredWorkloadRequest(
        parent=parent,
        uri=uri,
    )

    try:
        response = client.lookup_discovered_workload(request=request)
        print(f"Discovered Workload: {response.discovered_workload.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Lookup failed: {e}")
# [END apphub_v1_apphub_lookup_discovered_workload]
