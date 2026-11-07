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

# [START websecurityscanner_v1beta_websecurityscanner_scanconfigs_list]
import google.api_core.exceptions
from google.cloud import websecurityscanner_v1beta

client = websecurityscanner_v1beta.WebSecurityScannerClient()


def list_scan_configs(project_id: str) -> None:
    """Lists Web Security Scanner scan configurations for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    try:
        request = websecurityscanner_v1beta.ListScanConfigsRequest(
            parent=parent,
        )
        page_result = client.list_scan_configs(request=request)
        for scan_config in page_result:
            print(f"Scan config name: {scan_config.name}")
            print(f"Display name: {scan_config.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END websecurityscanner_v1beta_websecurityscanner_scanconfigs_list]
