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

# [START binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1beta1

client = binaryauthorization_v1beta1.SystemPolicyV1Beta1Client()


def get_system_policy(location_id: str) -> None:
    """Retrieves the system policy for the specified location.

    Args:
        location_id: The Google Cloud location (region or 'global') for the
          system policy to retrieve.
    """
    name = f"locations/{location_id}/policy"

    try:
        response = client.get_system_policy(name=name)
        print(f"Retrieved system policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve system policy: {error}")
# [END binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
