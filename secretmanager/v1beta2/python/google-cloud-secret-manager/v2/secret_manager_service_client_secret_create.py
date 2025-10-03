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

# [START secretmanager_v1beta2_secretmanagerservice_secret_create]
from google.cloud import secretmanager_v1beta2 as secretmanager
from google.api_core.exceptions import AlreadyExists

def create_secret_sample(
    project_id: str,
    secret_id: str,
) -> None:
    """
    Creates a new secret with the given ID in the specified project.


    Args:
        project_id: The Google Cloud project ID where the secret will be created.
        secret_id: The unique ID for the new secret within the project.
    """
    client = secretmanager.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    secret = secretmanager.Secret(
        replication=secretmanager.Replication(automatic=secretmanager.Replication.Automatic())
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

    except AlreadyExists as e:
        print(
            f"Error: Secret '{secret_id}' already exists in project '{project_id}'. "
            f"Consider using a different secret ID or updating the existing secret. Details: {e}"
        )

    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END secretmanager_v1beta2_secretmanagerservice_secret_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new secret in Google Cloud Secret Manager."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The unique ID for the new secret (e.g., 'my-secret')."
    )
    args = parser.parse_args()

    create_secret_sample(args.project_id, args.secret_id)
