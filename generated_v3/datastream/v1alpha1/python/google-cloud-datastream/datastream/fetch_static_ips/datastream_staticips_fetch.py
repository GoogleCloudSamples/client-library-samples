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

# [START datastream_v1alpha1_datastream_fetch_static_ips]
import google.api_core.exceptions
from google.cloud import datastream_v1alpha1

client = datastream_v1alpha1.DatastreamClient()


def fetch_static_ips(project_id: str, location_id: str) -> None:
    """Fetch static IP addresses for Datastream in a specific location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    name = f"projects/{project_id}/locations/{location_id}"

    request = datastream_v1alpha1.FetchStaticIpsRequest(
        name=name,
    )

    try:
        response = client.fetch_static_ips(request=request)
        for ip in response.static_ips:
            print(f"Static IP: {ip}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END datastream_v1alpha1_datastream_fetch_static_ips]
