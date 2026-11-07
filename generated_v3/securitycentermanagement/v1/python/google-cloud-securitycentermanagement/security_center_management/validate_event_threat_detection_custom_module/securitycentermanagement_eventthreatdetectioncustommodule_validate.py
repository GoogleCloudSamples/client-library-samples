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

# [START securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1

client = securitycentermanagement_v1.SecurityCenterManagementClient()


def validate_event_threat_detection_custom_module(project_id: str, location_id: str) -> None:
    """Use the validate_event_threat_detection_custom_module method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global').
    """
    type = "CONFIGURABLE_BAD_IP"
    raw_text = '{"ips": ["192.0.2.1"]}'
    parent = f"projects/{project_id}/locations/{location_id}"

    request = securitycentermanagement_v1.ValidateEventThreatDetectionCustomModuleRequest(
        parent=parent,
        raw_text=raw_text,
        type_=type,
    )

    try:
        response = client.validate_event_threat_detection_custom_module(request=request)
        print(f"Validation errors count: {len(response.errors)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END securitycentermanagement_v1_securitycentermanagement_validate_event_threat_detection_custom_module]
