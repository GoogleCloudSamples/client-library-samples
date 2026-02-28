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

# [START secretmanager_v1_secretmanagerservice_secret_create]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def create_secret(project_id: str, secret_id: str) -> None:
    """Creates a new secret resource. This demonstrates how to define a secret configured for automatic global replication, ensuring high availability across all regions.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret to create (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    try:
        response = client.create_secret(
            request={
                "parent": parent,
                "secret_id": secret_id,
                "secret": {
                    "replication": {
                        "automatic": {},
                    },
                },
            }
        )
        print(f"Created secret: {response.name}")

    except google.api_core.exceptions.AlreadyExists:
        print(
            f"Error: The secret '{secret_id}' already exists in project "
            f"'{project_id}'. Use a different, unique secret ID."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_create]
