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

# [START secretmanager_v1beta1_secretmanagerservice_secret_get]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def get_secret(project_id: str, secret_id: str) -> None:
    """Retrieves metadata for a specified Secret.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        secret_id: The secret identifier (for example, 'example-secret-id').
    """
    name = client.secret_path(project_id, secret_id)

    request = secretmanager_v1beta1.GetSecretRequest(
        name=name,
    )

    try:
        response = client.get_secret(request=request)
        print(f"Secret retrieved: {response.name}")
        print(f"Replication policy: {response.replication}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve secret: {e}")
# [END secretmanager_v1beta1_secretmanagerservice_secret_get]
