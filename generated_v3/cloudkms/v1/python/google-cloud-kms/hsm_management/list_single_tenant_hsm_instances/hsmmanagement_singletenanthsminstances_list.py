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

# [START cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_single_tenant_hsm_instances(project_id: str, location_id: str) -> None:
    """Lists single-tenant HSM instances in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = kms_v1.HsmManagementClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = kms_v1.ListSingleTenantHsmInstancesRequest(
        parent=parent,
    )

    try:
        instances = client.list_single_tenant_hsm_instances(request=request)
        for instance in instances:
            print(f"Single-tenant HSM instance name: {instance.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list single-tenant HSM instances: {error}")
# [END cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
