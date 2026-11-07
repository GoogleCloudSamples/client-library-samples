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

# [START datastream_v1_datastream_fetch_static_ips]
import google.api_core.exceptions
from google.cloud import datastream_v1

client = datastream_v1.DatastreamClient()


def fetch_static_ips(project_id: str, location_id: str) -> None:
    """Use the fetch_static_ips method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    name = client.common_location_path(project_id, location_id)

    request = datastream_v1.FetchStaticIpsRequest(
        name=name,
    )

    try:
        response = client.fetch_static_ips(request=request)
        for ip in response:
            print(f"Static IP: {ip}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to fetch static IP addresses: {error}")


# [END datastream_v1_datastream_fetch_static_ips]
