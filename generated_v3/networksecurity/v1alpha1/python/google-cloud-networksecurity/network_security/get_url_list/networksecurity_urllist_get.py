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

# [START network_security_get_url_list]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Retrieves details of a specified URL list.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        url_list_id: ID of the UrlList (for example, 'example-urllist-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    name = f"projects/{project_id}/locations/{location_id}/urlLists/{url_list_id}"

    request = network_security_v1.GetUrlListRequest(
        name=name,
    )

    try:
        response = client.get_url_list(request=request)
        print(f"Retrieved URL list: {response.name}")
        print(f"URLs: {response.values}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END network_security_get_url_list]
