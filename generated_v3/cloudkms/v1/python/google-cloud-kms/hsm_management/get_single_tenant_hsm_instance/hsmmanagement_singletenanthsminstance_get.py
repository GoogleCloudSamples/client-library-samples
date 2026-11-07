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

# [START cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
import google.api_core.exceptions
from google.cloud import kms_v1


def get_single_tenant_hsm_instance(
    project_id: str, location_id: str, single_tenant_hsm_instance_id: str
) -> None:
    """Retrieves details of an existing Single-Tenant HSM instance.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the Single-Tenant HSM instance resides.
        single_tenant_hsm_instance_id: The identifier of the Single-Tenant HSM instance.
    """
    client = kms_v1.HsmManagementClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"singleTenantHsmInstances/{single_tenant_hsm_instance_id}"
    )

    try:
        response = client.get_single_tenant_hsm_instance(name=name)
        print(f"Retrieved Single-Tenant HSM instance: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve Single-Tenant HSM instance: {error}")
# [END cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
