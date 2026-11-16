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

# [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha


def get_instance_os_policies_compliance(project_id: str) -> None:
    """Gets the OS policy compliance data for a specific Compute Engine VM instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = osconfig_v1alpha.OsConfigZonalServiceClient()

    # Define the compliance resource name with a fallback placeholder
    name = f"projects/{project_id}/locations/us-central1-a/instanceOSPoliciesCompliances/example-instance-id"

    # Search for an existing instance OS policy compliance record in the project
    zones = ["-", "us-central1-a", "us-central1-b", "us-central1-c", "us-central1-f", "us-east1-b", "us-west1-a"]
    for zone in zones:
        try:
            compliances = client.list_instance_os_policies_compliances(
                parent=f"projects/{project_id}/locations/{zone}"
            )
            first_compliance = next(iter(compliances), None)
            if first_compliance:
                name = first_compliance.name
                break
        except google.api_core.exceptions.GoogleAPICallError:
            continue

    request = osconfig_v1alpha.GetInstanceOSPoliciesComplianceRequest(
        name=name,
    )

    try:
        response = client.get_instance_os_policies_compliance(request=request)
        print(f"Instance: {response.name}")
        print(f"Compliance state: {response.state}")
        for policy_compliance in response.os_policy_compliances:
            print(f"OS Policy ID: {policy_compliance.os_policy_id}")
            print(f"Policy compliance state: {policy_compliance.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error: {e}")
# [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]
