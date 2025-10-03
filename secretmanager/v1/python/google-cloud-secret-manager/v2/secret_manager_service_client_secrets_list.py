# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START secretmanager_v1_secretmanagerservice_secrets_list]
from google.api_core import exceptions
from google.cloud import secretmanager_v1


def list_secrets(project_id: str) -> None:
    """Lists all secrets within a given Google Cloud project.

    This function retrieves a paginated list of secrets associated with
    a specific project using the Secret Manager API.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    try:
        for secret in client.list_secrets(parent=parent):
            print(f"Found secret: {secret.name}")

        print(f"Successfully listed secrets for project: {project_id}")

    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Please ensure the service account has "
            f"'Secret Manager Viewer' (roles/secretmanager.viewer) or "
            f"equivalent permissions on project '{project_id}'. Details: {e}"
        )
    except exceptions.NotFound as e:
        print(
            f"Error: Project '{project_id}' not found or inaccessible. "
            f"Please verify the project ID. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secrets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all secrets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="The Google Cloud project ID."
    )
    args = parser.parse_args()
    list_secrets(args.project_id)
