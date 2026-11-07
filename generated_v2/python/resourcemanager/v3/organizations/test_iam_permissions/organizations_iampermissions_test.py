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

# [START cloudresourcemanager_v3_organizations_test_iam_permissions]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def test_iam_permissions(organization_id: str) -> None:
    """Tests IAM permissions on an organization.

    Args:
        organization_id: The unique server-generated numeric identifier of the
          organization. For example, "123456789012".
    """
    client = resourcemanager_v3.OrganizationsClient()

    permissions = ["resourcemanager.organizations.get"]
    resource = f"organizations/{organization_id}"

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Permissions granted on {resource}:")
        for permission in response.permissions:
            print(f"- {permission}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to test permissions: {error}")
# [END cloudresourcemanager_v3_organizations_test_iam_permissions]
