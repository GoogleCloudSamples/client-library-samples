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

# [START secretmanager_v1_secretmanagerservice_secret_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import secretmanager_v1


def create_secret(project_id: str, secret_id: str) -> None:
    """Creates a new secret in Google Cloud using Secret Manager.

    A secret is a logical container for sensitive data, and it can have
    multiple versions, each holding a specific value of the secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The unique ID for the secret to create (e.g., "my-secret").
                   Must be unique within the project.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    secret = secretmanager_v1.Secret(
        replication=secretmanager_v1.Replication(
            automatic=secretmanager_v1.Replication.Automatic()
        )
    )

    try:
        created_secret = client.create_secret(
            request={
                "parent": parent,
                "secret_id": secret_id,
                "secret": secret,
            }
        )
        print(f"Successfully created secret: {created_secret.name}")
    except AlreadyExists:
        print(f"Secret '{secret_id}' already exists in project '{project_id}'.")
        print(
            "Consider using update_secret or add_secret_version "
            "if you want to modify it."
        )
    except GoogleAPICallError as e:
        print(f"Error creating secret '{secret_id}': {e}")
        print(
            "Please check your project ID, permissions, and "
            "ensure the secret ID is valid."
        )


# [END secretmanager_v1_secretmanagerservice_secret_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new secret in Google Cloud Secret Manager."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="The Google Cloud project ID"
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The unique ID for the secret to create (e.g., 'my-new-secret').",
    )
    args = parser.parse_args()
    create_secret(args.project_id, args.secret_id)
