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

# [START cloudshell_v1_cloudshellservice_remove_public_key]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import shell_v1


def remove_public_key(user_id: str, environment_id: str, key: str) -> None:
    """Removes an SSH public key from a Cloud Shell environment.

    Args:
        user_id: The user identifier or email address for the Cloud Shell
            environment, or "me" for the authenticated user.
        environment_id: The Cloud Shell environment ID, typically "default".
        key: The public SSH key string to remove from the Cloud Shell
            environment.
    """
    client = shell_v1.CloudShellServiceClient()

    environment = f"users/{user_id}/environments/{environment_id}"

    request = shell_v1.RemovePublicKeyRequest(
        environment=environment,
        key=key,
    )

    try:
        operation = client.remove_public_key(request=request)
        operation.result()
        print(f"Public key removed successfully from environment: {environment}")
    except GoogleAPICallError as e:
        print(f"Operation failed with error: {e}")
# [END cloudshell_v1_cloudshellservice_remove_public_key]
