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

# [START secretmanager_v1_secretmanagerservice_secret_get]
from google.api_core import exceptions
from google.cloud import secretmanager_v1


def get_secret(
    project_id: str,
    secret_id: str,
) -> None:
    """Get metadata for a given secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to retrieve.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        secret = client.get_secret(name=secret_name)

        print(f"Successfully retrieved secret: {secret.name}")
        print(f"  Created: {secret.create_time.isoformat()}")
        print(f"  Replication policy: {secret.replication}")

        if secret.labels:
            print("  Labels:")
            for key, value in secret.labels.items():
                print(f"    {key}: {value}")

    except exceptions.NotFound:
        print(f"Error: Secret '{secret_id}' not found in project '{project_id}'.")
        print("Please ensure the secret ID and project ID are correct.")
        print("You might need to create the secret first if it doesn't exist.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get metadata for a secret in Google Secret Manager."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The ID of the secret to retrieve. Example: 'my-secret'",
    )
    args = parser.parse_args()
    get_secret(args.project_id, args.secret_id)
