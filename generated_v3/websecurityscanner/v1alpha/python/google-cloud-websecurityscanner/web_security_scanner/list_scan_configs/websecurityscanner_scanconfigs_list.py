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

# [START websecurityscanner_v1alpha_websecurityscanner_scanconfigs_list]
from google.api_core import exceptions
from google.cloud import websecurityscanner_v1alpha


def list_scan_configs(project_id: str) -> None:
    """Lists Web Security Scanner configurations for a given project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = websecurityscanner_v1alpha.WebSecurityScannerClient()
    parent = f"projects/{project_id}"

    try:
        response = client.list_scan_configs(parent=parent)
        found_configs = False
        for scan_config in response:
            found_configs = True
            print(f"Scan Config Name: {scan_config.name}")
            print(f"Display Name: {scan_config.display_name}")
            print(f"Starting URLs: {scan_config.starting_urls}")

        if not found_configs:
            print(f"No scan configurations found for {parent}.")
    except exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END websecurityscanner_v1alpha_websecurityscanner_scanconfigs_list]
