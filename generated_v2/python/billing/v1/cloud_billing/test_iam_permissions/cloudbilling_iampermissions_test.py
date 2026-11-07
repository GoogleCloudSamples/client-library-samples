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

# [START cloudbilling_v1_cloudbilling_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import billing_v1
from google.iam.v1 import iam_policy_pb2


def test_iam_permissions(billing_account_id: str) -> None:
    """Tests IAM permissions on a billing account.

    Args:
        billing_account_id: The ID of the billing account, for example
          '012345-567890-ABCDEF'.
    """
    client = billing_v1.CloudBillingClient()

    permissions = ["billing.accounts.get", "billing.accounts.update"]
    resource = f"billingAccounts/{billing_account_id}"

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource,
        permissions=permissions,
    )

    try:
        response = client.test_iam_permissions(request=request)
        print(f"Allowed permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudbilling_v1_cloudbilling_test_iam_permissions]
