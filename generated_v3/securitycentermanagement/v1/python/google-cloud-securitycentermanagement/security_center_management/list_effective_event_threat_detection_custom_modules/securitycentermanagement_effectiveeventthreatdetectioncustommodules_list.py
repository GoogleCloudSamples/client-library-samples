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

# [START securitycentermanagement_v1_securitycentermanagement_effectiveeventthreatdetectioncustommodules_list]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1


def list_effective_event_threat_detection_custom_modules(
    project_id: str, location_id: str
) -> None:
    """Lists effective Event Threat Detection custom modules.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location, for example, 'global'.
    """
    client = securitycentermanagement_v1.SecurityCenterManagementClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = (
        securitycentermanagement_v1.ListEffectiveEventThreatDetectionCustomModulesRequest(
            parent=parent,
        )
    )

    try:
        response = client.list_effective_event_threat_detection_custom_modules(
            request=request
        )
        count = 0
        for module in response:
            count += 1
            print(f"Module Name: {module.name}")
            print(f"Display Name: {module.display_name}")
            print(f"Enablement State: {module.enablement_state}")
        print(f"Retrieved {count} effective Event Threat Detection custom modules.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list effective custom modules: {error}")


# [END securitycentermanagement_v1_securitycentermanagement_effectiveeventthreatdetectioncustommodules_list]
