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

# [START securitycenter_v1_securitycenter_validate_event_threat_detection_custom_module]
import google.api_core.exceptions
from google.cloud import securitycenter_v1


def validate_event_threat_detection_custom_module(organization_id: str) -> None:
    """Validates an Event Threat Detection custom module for an organization.

    Args:
        organization_id: The numerical ID of the organization, for example,
          'example-organization-id'.
    """
    client = securitycenter_v1.SecurityCenterClient()

    parent = f"organizations/{organization_id}/eventThreatDetectionSettings"
    raw_text = '{"ips": ["192.0.2.1"]}'
    type = "CONFIGURABLE_BAD_IP"

    request = securitycenter_v1.ValidateEventThreatDetectionCustomModuleRequest(
        parent=parent,
        raw_text=raw_text,
        type=type,
    )

    try:
        response = client.validate_event_threat_detection_custom_module(request=request)
        print(f"Validation completed: {response.errors}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        print(f"Validation completed: {exc}")
# [END securitycenter_v1_securitycenter_validate_event_threat_detection_custom_module]
