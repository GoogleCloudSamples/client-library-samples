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

# [START secretmanager_v1beta1_secretmanagerservice_secretversion_access]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def access_secret_version(project_id: str, secret_id: str, version_id: str) -> None:
    """Access the payload for a given secret version.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        secret_id: The caller-chosen identifier of the Secret (for example, 'example-secret').
        version_id: The server-generated sequential version ID (for example, '1') or 'latest'.
    """
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    try:
        response = client.access_secret_version(name=name)
        payload = response.payload.data.decode("UTF-8")
        print(f"Accessed secret version: {response.name}")
        print(f"Payload: {payload}")
    except google.api_core.exceptions.NotFound:
        print(f"Secret version not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to access secret version: {e}")
# [END secretmanager_v1beta1_secretmanagerservice_secretversion_access]
