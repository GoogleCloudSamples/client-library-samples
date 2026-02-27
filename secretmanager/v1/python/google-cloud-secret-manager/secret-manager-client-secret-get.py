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

# [START secretmanager_v1_secretmanagerservice_secret_get]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def get_secret_metadata(project_id: str, secret_id: str) -> None:
    """Retrieves the metadata for a specific secret. This demonstrates how to fetch information about a secret resource without accessing its payload.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret to retrieve (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}"

    try:
        request = secretmanager_v1.GetSecretRequest(
            name=name,
        )

        secret = client.get_secret(request=request)

        print(f"Found secret: {secret.name}")
        print(f"  Create Time: {secret.create_time}")
        print(f"  Labels: {secret.labels}")
        print(f"  Replication: {secret.replication}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret '{secret_id}' was not found in project "
            f"'{project_id}'. Verify the secret exists and the "
            "name is correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_get]
