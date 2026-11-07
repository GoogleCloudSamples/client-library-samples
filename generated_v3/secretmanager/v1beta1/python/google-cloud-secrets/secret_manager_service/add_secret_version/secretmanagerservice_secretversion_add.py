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

# [START secretmanager_v1beta1_secretmanagerservice_add_secret_version]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1


def add_secret_version(project_id: str, secret_id: str) -> None:
    """Add a new secret version to an existing secret.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        secret_id: ID of the Secret (for example, 'example-secret-id')
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()

    parent = client.secret_path(project_id, secret_id)
    payload = secretmanager_v1beta1.SecretPayload(data=b"hello world!")

    try:
        response = client.add_secret_version(
            request={"parent": parent, "payload": payload}
        )
        print(f"Added secret version: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to add secret version: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_add_secret_version]
