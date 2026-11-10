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

# [START secretmanager_v1beta1_secretmanagerservice_enable_secret_version]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def enable_secret_version(project_id: str, secret_id: str, version_id: str) -> None:
    """Use the enable_secret_version method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        secret_id: ID of the Secret (for example, 'example-secret-id')
        version_id: ID of the Version (for example, 'example-version-id')
    """
    name = client.secret_version_path(project_id, secret_id, version_id)

    try:
        response = client.enable_secret_version(name=name)
        print(f"Enabled secret version: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END secretmanager_v1beta1_secretmanagerservice_enable_secret_version]
