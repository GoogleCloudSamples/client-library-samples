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

# [START secretmanager_v1beta1_secretmanagerservice_secret_delete]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def delete_secret(project_id: str, secret_id: str) -> None:
    """Deletes a secret from Secret Manager.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        secret_id: ID of the Secret (for example, 'example-secret-id').
    """
    name = client.secret_path(project_id, secret_id)

    try:
        client.delete_secret(name=name)
        print(f"Deleted secret: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Secret not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")
# [END secretmanager_v1beta1_secretmanagerservice_secret_delete]
