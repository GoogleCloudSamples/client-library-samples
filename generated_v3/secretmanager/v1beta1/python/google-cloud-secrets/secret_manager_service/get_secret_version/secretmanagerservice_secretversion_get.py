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

# [START secretmanager_v1beta1_secretmanagerservice_secretversion_get]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def get_secret_version(secret_version_id: str, project_id: str, secret_id: str) -> None:
    """Use the get_secret_version method

    Args:
        secret_version_id: The server-generated ID of the secret version (for example, '1'), or the alias 'latest'.
        project_id: The Google Cloud project ID.
        secret_id: The caller-chosen ID of the secret.
    """
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{secret_version_id}"

    try:
        response = client.get_secret_version(name=name)
        print(f"Secret version name: {response.name}")
        print(f"Secret version state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_secretversion_get]
