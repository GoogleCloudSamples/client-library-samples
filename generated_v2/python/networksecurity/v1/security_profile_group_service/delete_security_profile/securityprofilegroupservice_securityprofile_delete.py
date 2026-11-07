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

# [START networksecurity_v1_securityprofilegroupservice_securityprofile_delete]
import google.api_core.exceptions
from google.cloud import network_security_v1


def delete_security_profile(
    project_id: str, location_id: str, security_profile_id: str
) -> None:
    """Deletes an existing SecurityProfile resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global' or a
          supported region) where the SecurityProfile is located.
        security_profile_id: The ID of the SecurityProfile to delete.
    """
    client = network_security_v1.SecurityProfileGroupServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"securityProfiles/{security_profile_id}"
    )

    request = network_security_v1.DeleteSecurityProfileRequest(name=name)

    try:
        # DeleteSecurityProfile initiates a long-running operation.
        operation = client.delete_security_profile(request=request)
        operation.result()
        print(f"Deleted security profile: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete security profile: {error}")
# [END networksecurity_v1_securityprofilegroupservice_securityprofile_delete]
