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

# [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha

client = osconfig_v1alpha.OsConfigZonalServiceClient()


def list_instance_os_policies_compliances(project_id: str) -> None:
    """List OS policy compliance data for Compute Engine VM instances in a given zone.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}/locations/us-central1-a"

    request = osconfig_v1alpha.ListInstanceOSPoliciesCompliancesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_instance_os_policies_compliances(request=request)
        for response in page_result:
            print(f"Instance OS policy compliance: {response.name}")
            print(f"State: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
