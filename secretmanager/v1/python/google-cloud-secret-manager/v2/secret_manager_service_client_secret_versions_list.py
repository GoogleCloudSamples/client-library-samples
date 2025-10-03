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

# [START secretmanager_v1_secretmanagerservice_secretversions_list]
from google.api_core import exceptions
from google.cloud import secretmanager_v1


def list_secret_versions(
    project_id: str,
    secret_id: str,
) -> None:
    """Lists all secret versions for a given secret.

    This function retrieve a list of all versions associated with a
    specific secret in Google Secret Manager. It iterates through
    the paginated response to ensure all versions are listed.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret whose versions are to be listed.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        print(f"Secret versions for secret: {secret_id}")
        found_versions = False
        for version in client.list_secret_versions(parent=secret_name):
            found_versions = True
            print(f"  Secret version: {version.name}, " f"State: {version.state.name}")
        if not found_versions:
            print("  No versions found")

    except exceptions.NotFound:
        print(f"Error: Secret '{secret_id}' not found in project '{project_id}'.")
        print("Please ensure the secret ID is correct and the secret exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secretversions_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all secret versions for a given secret."
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
        help="The ID of the secret. (e.g., 'my-secret').",
    )
    args = parser.parse_args()

    list_secret_versions(args.project_id, args.secret_id)
