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

# [START secretmanager_v1_secretmanagerservice_secretversion_add]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def add_secret_version(project_id: str, secret_id: str) -> None:
    """Adds a new version to an existing secret. This demonstrates how to rotate or update secret values, which is essential for reconfiguring service parameters and maintaining robust security.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}/secrets/{secret_id}"
    payload = secretmanager_v1.SecretPayload(data=b"my-new-secret-data")

    try:
        response = client.add_secret_version(
            request={"parent": parent, "payload": payload}
        )

        print(f"Added secret version: {response.name}")
        print(f"  State: {response.state.name}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Secret '{parent}' not found. Verify the secret "
            "exists before adding a version."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversion_add]
