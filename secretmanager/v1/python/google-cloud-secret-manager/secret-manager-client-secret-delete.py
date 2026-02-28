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

# [START secretmanager_v1_secretmanagerservice_secret_delete]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def delete_secret(project_id: str, secret_id: str) -> None:
    """Deletes a secret resource. This sample demonstrates how to remove a secret and all its associated versions from Secret Manager.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret to delete (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}"

    try:
        client.delete_secret(name=name)
        print(f"Deleted secret: {name}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret '{name}' was not found. It might have already "
            "been deleted or you might have provided an incorrect secret name."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_delete]
