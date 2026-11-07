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

# [START secretmanager_v1beta1_secretmanagerservice_disable_secret_version]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def disable_secret_version(project_id: str, secret_id: str, version_id: str) -> None:
    """Disables a specific version of a secret.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        secret_id: The caller-chosen ID of the Secret (for example, 'example-secret-id').
        version_id: The server-generated ID of the SecretVersion (for example, '1'). Numeric version numbers start at 1. Aliases like 'latest' are not permitted.
    """
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    try:
        response = client.disable_secret_version(name=name)
        print(f"Disabled secret version: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error occurred: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_disable_secret_version]
