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

# [START secretmanager_v1_secretmanagerservice_secretversion_get]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def get_secret_version_metadata(
    project_id: str, secret_id: str, version_id: str
) -> None:
    """Retrieves the metadata for a specific secret version. This demonstrates how to fetch information about a secret version without accessing its payload.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret (such as 'my-secret-id')
        version_id: ID of the version (such as 'latest')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    request = secretmanager_v1.GetSecretVersionRequest(
        name=name,
    )

    try:
        version = client.get_secret_version(request=request)

        print(f"Found secret version: {version.name}")
        print(f"  Create Time: {version.create_time}")
        print(f"  State: {version.state.name}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Secret version '{name}' not found. This can happen if the "
            "secret or version ID is incorrect. Verify them and try again."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversion_get]
