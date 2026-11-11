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

# [START securitycentermanagement_v1_securitycentermanagement_securitycenterservice_update]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1
from google.protobuf import field_mask_pb2

client = securitycentermanagement_v1.SecurityCenterManagementClient()


def update_security_center_service(project_id: str, location_id: str, security_center_service_id: str) -> None:
    """Use the update_security_center_service method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location for the Security Command Center service, such as 'global'.
        security_center_service_id: The Security Command Center service identifier. Supported values are 'container-threat-detection', 'event-threat-detection', 'security-health-analytics', 'vm-threat-detection', and 'web-security-scanner'.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["intended_enablement_state"])
    security_center_service = securitycentermanagement_v1.SecurityCenterService(
        name=f"projects/{project_id}/locations/{location_id}/securityCenterServices/{security_center_service_id}",
        intended_enablement_state=securitycentermanagement_v1.SecurityCenterService.EnablementState.ENABLED,
    )

    try:
        response = client.update_security_center_service(
            security_center_service=security_center_service,
            update_mask=update_mask,
        )
        print(f"Updated service name: {response.name}")
        print(f"Intended enablement state: {response.intended_enablement_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update Security Command Center service: {e}")
# [END securitycentermanagement_v1_securitycentermanagement_securitycenterservice_update]
