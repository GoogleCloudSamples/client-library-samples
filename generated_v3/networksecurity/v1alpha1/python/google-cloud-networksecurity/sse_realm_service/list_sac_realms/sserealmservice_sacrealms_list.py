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

# [START networksecurity_v1alpha1_sserealmservice_sacrealms_list]
from google.api_core import exceptions
from google.cloud import network_security_v1alpha1


def list_sac_realms(project_id: str) -> None:
    """Lists SAC Realms in a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = network_security_v1alpha1.SSERealmServiceClient()
    parent = f"projects/{project_id}/locations/global"

    request = network_security_v1alpha1.ListSACRealmsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_sac_realms(request=request)
        print(f"Listing SAC Realms for {parent}:")
        count = 0
        for realm in page_result:
            print(f"- {realm.name}")
            count += 1
        if count == 0:
            print("No SAC Realms found.")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END networksecurity_v1alpha1_sserealmservice_sacrealms_list]
