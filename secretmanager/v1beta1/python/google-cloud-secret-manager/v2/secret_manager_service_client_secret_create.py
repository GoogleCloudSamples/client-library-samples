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

# [START secretmanager_v1beta1_secretmanagerservice_secret_create]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta1


def create_secret(project_id: str, secret_id: str) -> None:
    """
    Creates a new secret in Google Cloud Secret Manager.

    A secret is a logical container for secret data, composed of zero or more
    secret versions. This sample creates a new secret without any secret
    versions. Secret versions can be added later using the `add_secret_version`
    method.

    Args:
        project_id: The Google Cloud project ID where the secret will be created.
        secret_id: The user-provided ID for the new secret. This must be unique
                   within the project and can contain uppercase and lowercase
                   letters, numerals, and the hyphen (-) and underscore (_) characters.
                   Maximum length is 255 characters. Example: 'my-new-secret'
    """
    try:
        client = secretmanager_v1beta1.SecretManagerServiceClient()

        parent = f"projects/{project_id}"

        # The replication policy is immutable and must be set during secret creation.
        # Automatic replication is the simplest and recommended approach for most use cases.
        secret = secretmanager_v1beta1.Secret(
            replication={
                "automatic": secretmanager_v1beta1.Replication.Automatic(),
            }
        )

        request = secretmanager_v1beta1.CreateSecretRequest(
            parent=parent,
            secret_id=secret_id,
            secret=secret,
        )

        created_secret = client.create_secret(request=request)

        print(f"Successfully created secret: {created_secret.name}")

    except exceptions.AlreadyExists as e:
        print(f"Error: Secret '{secret_id}' already exists in project '{project_id}'.")
        print("Please choose a different secret ID or use the existing secret.")
    except exceptions.GoogleAPICallError as e:
        print(f"Google API Error: {e.message}")
        print(
            f"Check if the project ID '{project_id}' is correct and you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_secret_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new secret in Google Cloud Secret Manager."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--secret_id",
        required=True,
        type=str,
        help="The user-provided ID for the new secret. " "Example: 'my-new-secret'",
    )
    args = parser.parse_args()

    create_secret(args.project_id, args.secret_id)
