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

# [START securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1


def list_descendant_security_health_analytics_custom_modules(
    project_id: str, location_id: str
) -> None:
    """Lists descendant Security Health Analytics custom modules.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global' or 'us-central1').
    """
    client = securitycentermanagement_v1.SecurityCenterManagementClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = securitycentermanagement_v1.ListDescendantSecurityHealthAnalyticsCustomModulesRequest(
        parent=parent
    )

    try:
        response = client.list_descendant_security_health_analytics_custom_modules(
            request=request
        )
        count = 0
        for custom_module in response:
            count += 1
            print(f"Module Name: {custom_module.name}")
            print(f"Display Name: {custom_module.display_name}")
            print(f"Enablement State: {custom_module.enablement_state.name}")

        if count == 0:
            print("No descendant custom modules found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing custom modules: {error}")
# [END securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]
