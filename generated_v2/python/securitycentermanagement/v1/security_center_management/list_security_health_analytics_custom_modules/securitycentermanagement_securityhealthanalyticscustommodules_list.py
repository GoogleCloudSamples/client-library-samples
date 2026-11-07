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

# [START securitycentermanagement_v1_securitycentermanagement_securityhealthanalyticscustommodules_list]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1


def list_security_health_analytics_custom_modules(
    project_id: str, location_id: str
) -> None:
    """List Security Health Analytics custom modules.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client = securitycentermanagement_v1.SecurityCenterManagementClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_security_health_analytics_custom_modules(parent=parent)
        module_count = 0
        for custom_module in response:
            module_count += 1
            print(f"Custom Module Name: {custom_module.name}")
            print(f"Display Name: {custom_module.display_name}")
            print(f"Enablement State: {custom_module.enablement_state}")
        if module_count == 0:
            print("No Security Health Analytics custom modules found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END securitycentermanagement_v1_securitycentermanagement_securityhealthanalyticscustommodules_list]
