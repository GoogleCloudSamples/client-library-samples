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

# [START secretmanager_v1beta2_secretmanagerservice_secret_delete]
from google.cloud import secretmanager_v1beta2
from google.api_core.exceptions import NotFound, GoogleAPICallError


def delete_secret_sample(project_id: str, secret_id: str) -> None:
    """
    Deletes a secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to delete.
                   (e.g., 'my-secret-to-delete')
    """
    client = secretmanager_v1beta2.SecretManagerServiceClient()

    name = client.secret_path(project_id, secret_id)

    try:
        client.delete_secret(name=name)
        print(f"Successfully deleted secret: {secret_id}")
    except NotFound:
        print(f"Secret '{secret_id}' not found in project '{project_id}'. ")
        print("Please check the secret ID and project ID.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, secret ID, and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta2_secretmanagerservice_secret_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a secret in Google Cloud Secret Manager."
    )
    parser.add_argument(
        "--project_id", required=True, type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id", required=True, type=str,
        help="The ID of the secret to delete",
    )
    args = parser.parse_args()

    delete_secret_sample(args.project_id, args.secret_id)
