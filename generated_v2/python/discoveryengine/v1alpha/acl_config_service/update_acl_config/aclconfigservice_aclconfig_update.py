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

# [START discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha


def update_acl_config(project_id: str, location_id: str) -> None:
    """Updates the ACL configuration for Discovery Engine.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, such as 'global'.
    """
    client = discoveryengine_v1alpha.AclConfigServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/aclConfig"

    try:
        # Retrieve the existing ACL configuration
        acl_config = client.get_acl_config(name=name)

        # Set the identity provider type
        acl_config.idp_config.idp_type = (
            discoveryengine_v1alpha.IdpConfig.IdpType.GSUITE
        )

        # Build the update request with the modified ACL configuration
        request = discoveryengine_v1alpha.UpdateAclConfigRequest(
            acl_config=acl_config
        )

        # Perform full replacement update of the ACL configuration
        response = client.update_acl_config(request=request)
        print(f"Updated ACL configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
