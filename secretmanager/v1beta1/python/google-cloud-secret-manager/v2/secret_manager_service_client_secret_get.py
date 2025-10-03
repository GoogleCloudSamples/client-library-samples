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

# [START secretmanager_v1beta1_secretmanagerservice_secret_get]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta1


def get_secret_metadata(
    project_id: str,
    secret_id: str,
) -> None:
    """Get metadata for a given secret.

    The get_secret method retrieves metadata about a secret, such as its creation time,
    labels, and replication policy, but it does not retrieve the secret's payload.
    To retrieve the secret's payload, use the `access_secret_version` method.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to retrieve metadata for.
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()

    name = client.secret_path(project_id, secret_id)

    try:
        secret = client.get_secret(name=name)

        print(f"Successfully retrieved secret: {secret.name}")
        print(f"  Create Time: {secret.create_time.strftime('%Y-%m-%d %H:%M:%S UTC')}")
        print(f"  Replication Policy: {secret.replication}")
        if secret.labels:
            print("  Labels:")
            for key, value in secret.labels.items():
                print(f"    {key}: {value}")

    except exceptions.NotFound:
        print(f"Error: Secret '{name}' not found.")
        print(
            "Please ensure the secret ID and project ID are correct and the secret exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred while getting secret '{name}': %s", e)


# [END secretmanager_v1beta1_secretmanagerservice_secret_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get metadata for a secret in Google Secret Manager."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The ID of the secret to retrieve metadata for.",
    )
    args = parser.parse_args()

    get_secret_metadata(args.project_id, args.secret_id)
