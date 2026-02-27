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

# [START secretmanager_v1_secretmanagerservice_secretversion_enable]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def enable_secret_version(project_id: str, secret_id: str, version_id: str) -> None:
    """Enables a secret version. This demonstrates restoring access to a previously disabled secret version.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret (such as 'my-secret-id')
        version_id: ID of the version (such as 'latest')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    request = secretmanager_v1.EnableSecretVersionRequest(
        name=name,
    )

    try:
        response = client.enable_secret_version(request=request)
        print(f"Enabled secret version: {response.name}")
    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret version '{name}' was not found. Check "
            "that the secret and version exist."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversion_enable]
