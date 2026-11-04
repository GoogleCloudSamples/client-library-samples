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

# [START secretmanager_v1beta1_secretmanagerservice_secretversions_list]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def list_secret_versions(project_id: str, secret_id: str) -> None:
    """Lists secret versions for an existing secret.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        secret_id: The identifier of the secret (for example,
          'example-secret-id').
    """
    parent = f"projects/{project_id}/secrets/{secret_id}"

    request = secretmanager_v1beta1.ListSecretVersionsRequest(
        parent=parent,
    )

    try:
        response = client.list_secret_versions(request=request)
        for version in response:
            print(f"Found secret version: {version.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_secretversions_list]
