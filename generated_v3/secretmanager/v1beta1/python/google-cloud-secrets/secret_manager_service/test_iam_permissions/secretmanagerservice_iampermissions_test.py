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

# [START secretmanager_v1beta1_secretmanagerservice_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def test_iam_permissions(project_id: str, secret_id: str) -> None:
    """Use the test_iam_permissions method

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The caller-specified ID of the secret to test permissions against.
    """
    permissions = ["secretmanager.secrets.get", "secretmanager.secrets.update"]
    resource = f"projects/{project_id}/secrets/{secret_id}"

    try:
        response = client.test_iam_permissions(
            request={
                "resource": resource,
                "permissions": permissions,
            }
        )
        print(f"Granted permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to test IAM permissions: {e}")
# [END secretmanager_v1beta1_secretmanagerservice_test_iam_permissions]
