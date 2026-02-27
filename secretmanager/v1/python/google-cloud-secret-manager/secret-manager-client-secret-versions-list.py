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

# [START secretmanager_v1_secretmanagerservice_secretversions_list]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def list_secret_versions(project_id: str, secret_id: str) -> None:
    """Lists all secret versions for a given secret. This demonstrates how to view all versions associated with a secret.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}/secrets/{secret_id}"

    try:
        for version in client.list_secret_versions(request={"parent": parent}):
            print(f"Found version: {version.name}")
            print(f"  State: {version.state.name}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret '{secret_id}' was not found in project "
            f"'{project_id}'. Verify the secret and project IDs "
            "are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversions_list]
