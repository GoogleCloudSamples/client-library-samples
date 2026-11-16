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

# [START iap_v1_identityawareproxyadminservice_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import iap_v1


def test_iam_permissions(resource: str) -> None:
    """Tests IAM permissions on an Identity-Aware Proxy resource.

    Args:
        resource: The fully qualified resource name of the IAP-protected
            resource for which to test permissions.
    """
    client = iap_v1.IdentityAwareProxyAdminServiceClient()

    permissions = ["iap.tunnelDestGroups.get"]

    try:
        response = client.test_iam_permissions(
            request={
                "resource": resource,
                "permissions": permissions,
            }
        )
        print(f"Allowed permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test IAM permissions: {error}")
# [END iap_v1_identityawareproxyadminservice_test_iam_permissions]
