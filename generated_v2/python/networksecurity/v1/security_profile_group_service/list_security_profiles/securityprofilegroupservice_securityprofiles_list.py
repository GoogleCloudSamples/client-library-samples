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

# [START networksecurity_v1_securityprofilegroupservice_securityprofiles_list]
from google.api_core import exceptions
from google.cloud import network_security_v1


def list_security_profiles(projects_organization_id: str, location_id: str) -> None:
    """Lists security profiles in a specific project or organization and location.

    Args:
        projects_organization_id: Google Cloud project ID or organization ID (for example, 'example-project-id').
        location_id: Google Cloud location where the service is located (for example, 'global').
    """
    client = network_security_v1.SecurityProfileGroupServiceClient()

    if "/" in projects_organization_id:
        parent = f"{projects_organization_id}/locations/{location_id}"
    elif projects_organization_id.isdigit():
        parent = f"organizations/{projects_organization_id}/locations/{location_id}"
    else:
        parent = f"projects/{projects_organization_id}/locations/{location_id}"

    request = network_security_v1.ListSecurityProfilesRequest(
        parent=parent,
    )

    try:
        response = client.list_security_profiles(request=request)
        for profile in response:
            print(f"Security Profile: {profile.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END networksecurity_v1_securityprofilegroupservice_securityprofiles_list]
