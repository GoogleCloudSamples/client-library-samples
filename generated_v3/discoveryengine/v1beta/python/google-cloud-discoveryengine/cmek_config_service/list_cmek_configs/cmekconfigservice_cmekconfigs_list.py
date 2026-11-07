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

# [START discoveryengine_v1beta_cmekconfigservice_cmekconfigs_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def list_cmek_configs(project_id: str, location_id: str) -> None:
    """Lists CMEK configurations in a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = discoveryengine_v1beta.CmekConfigServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = discoveryengine_v1beta.ListCmekConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_cmek_configs(request=request)
        print(f"Listed CMEK configurations for {parent}:")
        count = 0
        for config in response.cmek_configs:
            print(f"Config name: {config.name}")
            print(f"KMS key: {config.kms_key}")
            count += 1
        if count == 0:
            print("No CMEK configurations found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END discoveryengine_v1beta_cmekconfigservice_cmekconfigs_list]
