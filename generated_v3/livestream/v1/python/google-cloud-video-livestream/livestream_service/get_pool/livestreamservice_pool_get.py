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

# [START livestream_v1_livestreamservice_pool_get]
import google.api_core.exceptions
from google.cloud.video import live_stream_v1


def get_pool(project_id: str, location_id: str, pool_id: str) -> None:
    """Retrieves details of a pool in the Live Stream API.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Live Stream pool is located (for example, 'us-central1').
        pool_id: The ID of the pool resource (typically 'default').
    """
    client = live_stream_v1.LivestreamServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/pools/{pool_id}"

    request = live_stream_v1.GetPoolRequest(name=name)

    try:
        response = client.get_pool(request=request)
        print(f"Pool retrieved: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get pool: {e}")
# [END livestream_v1_livestreamservice_pool_get]
