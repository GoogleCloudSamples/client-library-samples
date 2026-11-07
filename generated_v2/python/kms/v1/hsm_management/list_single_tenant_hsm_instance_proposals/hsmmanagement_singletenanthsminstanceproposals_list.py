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

# [START cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_single_tenant_hsm_instance_proposals(
    project_id: str, location_id: str, single_tenant_hsm_instance_id: str
) -> None:
    """Lists single-tenant HSM instance proposals for a single-tenant HSM instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        single_tenant_hsm_instance_id: The identifier of the SingleTenantHsmInstance resource (for example, 'example-instance-id').
    """
    client = kms_v1.HsmManagementClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"singleTenantHsmInstances/{single_tenant_hsm_instance_id}"
    )

    request = kms_v1.ListSingleTenantHsmInstanceProposalsRequest(
        parent=parent,
    )

    try:
        proposals = client.list_single_tenant_hsm_instance_proposals(request=request)
        count = 0
        for proposal in proposals:
            print(f"Proposal name: {proposal.name}")
            count += 1

        if count == 0:
            print(f"No proposals found for {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")


# [END cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]
