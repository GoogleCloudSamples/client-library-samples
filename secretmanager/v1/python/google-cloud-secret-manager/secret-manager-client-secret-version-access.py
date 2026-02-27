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

# [START secretmanager_v1_secretmanagerservice_secretversion_access]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def access_secret_version(project_id: str, secret_id: str, version_id: str) -> None:
    """Accesses a specific secret version. This demonstrates retrieving the payload of a secret while enforcing cryptographic protection and access control.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret (such as 'my-secret-id')
        version_id: ID of the version (such as 'latest')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    try:
        response = client.access_secret_version(name=name)

        # WARNING: Do not print the secret in a production environment - this
        # is for demonstration purposes only.
        payload = response.payload.data.decode("UTF-8")
        print(f"Accessed secret version: {response.name}")
        print(f"  Payload: {payload}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret version '{name}' was not found. Verify "
            "the secret version name and your permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversion_access]
