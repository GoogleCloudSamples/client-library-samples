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

# [START binaryauthorization_v1_systempolicyv1_systempolicy_get]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1

client = binaryauthorization_v1.SystemPolicyV1Client()


def get_system_policy(location_id: str) -> None:
    """Use the get_system_policy method.

    Args:
        location_id: The location of the system policy (for example, 'global').
    """
    name = f"locations/{location_id}/policy"
    request = binaryauthorization_v1.GetSystemPolicyRequest(name=name)

    try:
        response = client.get_system_policy(request=request)
        print(f"System policy name: {response.name}")
        print(f"System policy description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END binaryauthorization_v1_systempolicyv1_systempolicy_get]
