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

# [START secretmanager_v1beta2_secretmanagerservice_secret_get]
from google.cloud import secretmanager_v1beta2
from google.api_core.exceptions import NotFound, PermissionDenied


def get_secret_info(
    project_id: str,
    secret_id: str,
) -> None:
    """Gets metadata for a given Secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to retrieve (e.g., 'my-secret').
    """
    client = secretmanager_v1beta2.SecretManagerServiceClient()

    name = client.secret_path(project_id, secret_id)

    try:
        secret = client.get_secret(name=name)

        print(f"Successfully retrieved secret: {secret.name}")
        print(f"  Created: {secret.create_time.isoformat()}")
        replication_type = (
            "automatic" if "automatic" in secret.replication else "user_managed"
        )
        print(f"  Replication Policy: {replication_type}")
        if secret.labels:
            print("  Labels:")
            for key, value in secret.labels.items():
                print(f"    {key}: {value}")

    except NotFound:
        print(
            f"Secret '{secret_id}' not found in project '{project_id}'. "
            "Please ensure the secret ID and project ID are correct and the secret exists."
        )
    except PermissionDenied:
        print(
            f"Permission denied to access secret '{secret_id}' in project '{project_id}'. "
            "Ensure the service account or user has 'secretmanager.secrets.get' permission."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}", exc_info=True)


# [END secretmanager_v1beta2_secretmanagerservice_secret_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get metadata for a Google Cloud Secret Manager secret."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id",
        required=True,
        type=str,
        help="The ID of the secret to retrieve (e.g., 'my-secret').",
    )
    args = parser.parse_args()

    get_secret_info(args.project_id, args.secret_id)
