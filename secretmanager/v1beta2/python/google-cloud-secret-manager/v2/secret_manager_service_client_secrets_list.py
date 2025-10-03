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

# [START secretmanager_v1beta2_secretmanagerservice_secrets_list]
from google.cloud import secretmanager_v1beta2
from google.api_core.exceptions import GoogleAPICallError, PermissionDenied


def list_secrets_sample(project_id: str) -> None:
    """Lists all secrets in the specified Google Cloud project.


    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = secretmanager_v1beta2.SecretManagerServiceClient()
    parent = f"projects/{project_id}"

    print(f"Listing secrets in project: {project_id}")

    try:
        secrets = client.list_secrets(parent=parent)

        found_secrets = False
        for secret in secrets:
            found_secrets = True
            print(f"Found secret: {secret.name}")

        if not found_secrets:
            print("No secrets found in this project.")

    except PermissionDenied as e:
        print(
            f"Error: Permission denied when listing secrets for project '{project_id}'. "
            "Please ensure the service account or user running this code has "
            "'Secret Manager Viewer' (roles/secretmanager.viewer) or "
            "'Secret Manager Admin' (roles/secretmanager.admin) permissions "
            f"on the project. Details: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END secretmanager_v1beta2_secretmanagerservice_secrets_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all secrets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    args = parser.parse_args()

    list_secrets_sample(project_id=args.project_id)
