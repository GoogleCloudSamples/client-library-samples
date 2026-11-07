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

# [START secretmanager_v1beta1_secretmanagerservice_set_iam_policy]
import google.api_core.exceptions
import google.auth
from google.auth.transport.requests import Request
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def set_iam_policy(project_id: str, secret_id: str) -> None:
    """Sets the IAM policy for a secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to set the IAM policy for.
    """
    resource = f"projects/{project_id}/secrets/{secret_id}"

    try:
        # Retrieve the current IAM policy to preserve the etag for safe updates
        policy = client.get_iam_policy(request={"resource": resource})

        # Resolve an existing service account to satisfy Cloud IAM validation
        credentials, _ = google.auth.default()
        if getattr(credentials, "service_account_email", "default") == "default":
            credentials.refresh(Request())
        service_account = getattr(credentials, "service_account_email", None)
        if not service_account:
            service_account = f"example-service-account@{project_id}.iam.gserviceaccount.com"

        # Append a binding granting the secret accessor role
        policy.bindings.add(
            role="roles/secretmanager.secretAccessor",
            members=[f"serviceAccount:{service_account}"],
        )

        response = client.set_iam_policy(
            request={
                "resource": resource,
                "policy": policy,
            }
        )

        print(f"Updated IAM policy etag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to set IAM policy: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_set_iam_policy]
