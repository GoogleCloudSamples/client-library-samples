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

# [START apphub_v1_apphub_lookup_discovered_service]
import google.api_core.exceptions
from google.cloud import apphub_v1

client = apphub_v1.AppHubClient()


def lookup_discovered_service(project_id: str, location_id: str, uri: str) -> None:
    """Use the lookup_discovered_service method

    Args:
        project_id: The Google Cloud host project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the Discovered Service lookup (for example, 'us-central1' or 'global').
        uri: The resource URI of the underlying cloud resource (for example, a Compute Engine Forwarding Rule, URL Map, or Backend Service URI) to find the Discovered Service for.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = apphub_v1.LookupDiscoveredServiceRequest(
        parent=parent,
        uri=uri,
    )

    try:
        response = client.lookup_discovered_service(request=request)
        print(f"Discovered service resource: {response.discovered_service.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END apphub_v1_apphub_lookup_discovered_service]
