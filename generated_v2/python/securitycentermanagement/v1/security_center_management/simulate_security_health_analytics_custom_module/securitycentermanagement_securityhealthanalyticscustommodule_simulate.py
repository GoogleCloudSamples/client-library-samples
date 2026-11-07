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

# [START securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]
import google.api_core.exceptions
from google.cloud import securitycentermanagement_v1
from google.protobuf import struct_pb2


def simulate_security_health_analytics_custom_module(
    project_id: str, location_id: str
) -> None:
    """Simulates a Security Health Analytics custom module against a mock resource.

    Args:
        project_id: Google Cloud project ID, for example, "example-project-id".
        location_id: Google Cloud location ID, for example, "global".
    """
    client = securitycentermanagement_v1.SecurityCenterManagementClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    custom_config = securitycentermanagement_v1.CustomConfig(
        predicate={"expression": "has(resource.diskEncryptionKey)"},
        resource_selector={"resource_types": ["compute.googleapis.com/Disk"]},
        severity=securitycentermanagement_v1.CustomConfig.Severity.HIGH,
        description="The disk encryption key is present.",
        recommendation="Verify that disk encryption keys meet security policy requirements.",
    )

    resource_data = struct_pb2.Struct()
    resource_data.update(
        {"name": "example-disk", "diskEncryptionKey": {"kmsKeyName": "example-key"}}
    )

    resource = (
        securitycentermanagement_v1.SimulateSecurityHealthAnalyticsCustomModuleRequest.SimulatedResource(
            resource_type="compute.googleapis.com/Disk",
            resource_data=resource_data,
        )
    )

    request = (
        securitycentermanagement_v1.SimulateSecurityHealthAnalyticsCustomModuleRequest(
            parent=parent,
            custom_config=custom_config,
            resource=resource,
        )
    )

    try:
        response = client.simulate_security_health_analytics_custom_module(
            request=request
        )
        print("Simulation completed successfully.")
        print(f"Simulation result: {response.result}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to simulate custom module: {e}")
# [END securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]
