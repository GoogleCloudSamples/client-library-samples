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

# [START secretmanager_v1_secretmanagerservice_secret_delete]
from google.api_core import exceptions
from google.cloud import secretmanager_v1


def delete_secret(
    project_id: str,
    secret_id: str,
) -> None:
    """Deletes a secret from Google Cloud using Secret Manager.

    Deleting a secret permanently removes it and all its versions.
    This action is irreversible.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to delete.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        client.delete_secret(name=secret_name)
        print(f"Successfully deleted secret: {secret_name}")
    except exceptions.NotFound:
        print(
            f"Secret '{secret_name}' not found. " "It might have already been deleted."
        )
    except Exception as e:
        print(f"Error deleting secret '{secret_name}': {e}")


# [END secretmanager_v1_secretmanagerservice_secret_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a secret from Google Cloud Secret Manager."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The ID of the secret to delete (e.g., 'my-test-secret').",
    )
    args = parser.parse_args()

    delete_secret(args.project_id, args.secret_id)
