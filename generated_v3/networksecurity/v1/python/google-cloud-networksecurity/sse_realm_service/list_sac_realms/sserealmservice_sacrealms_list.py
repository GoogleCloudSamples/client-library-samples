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

# [START networksecurity_v1_sserealmservice_sacrealms_list]
import google.api_core.exceptions
from google.cloud import network_security_v1


def list_sac_realms(project_id: str, location_id: str) -> None:
    """Lists Secure Access Control (SAC) realms in a location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The location ID (for example, 'global'). SACRealm resources
          require the location to be 'global'.
    """
    client = network_security_v1.SSERealmServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1.ListSACRealmsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_sac_realms(request=request)
        for sac_realm in page_result:
            print(f"SAC Realm name: {sac_realm.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list SAC realms: {error}")
# [END networksecurity_v1_sserealmservice_sacrealms_list]
