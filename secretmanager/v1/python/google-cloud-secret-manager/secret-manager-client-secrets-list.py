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

# [START secretmanager_v1_secretmanagerservice_secrets_list]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def list_secrets(project_id: str) -> None:
    """Lists all secrets within a project. This demonstrates how to discover available secret resources.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    try:
        for secret in client.list_secrets(parent=parent):
            print(f"Found secret: {secret.name}")

    except google.api_core.exceptions.PermissionDenied:
        print(
            f"Error: Permission denied when listing secrets in project '{project_id}'."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secrets_list]
