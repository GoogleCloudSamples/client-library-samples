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

# [START securitycentermanagement_v1_securitycentermanagement_securitycenterservices_list]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1

client = securitycentermanagement_v1.SecurityCenterManagementClient()


def list_security_center_services(project_id: str, location_id: str) -> None:
    """Lists Security Command Center services for a project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = securitycentermanagement_v1.ListSecurityCenterServicesRequest(
            parent=parent,
        )
        response = client.list_security_center_services(request=request)

        for service in response:
            print(f"Service name: {service.name}")
            print(f"Intended enablement state: {service.intended_enablement_state}")
            print(f"Effective enablement state: {service.effective_enablement_state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Security Command Center services: {error}")
# [END securitycentermanagement_v1_securitycentermanagement_securitycenterservices_list]
