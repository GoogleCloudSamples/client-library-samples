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

# [START secretmanager_v1beta2_secretmanagerservice_secretversions_list]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta2


def list_secret_versions_sample(project_id: str, secret_id: str) -> None:
    """Lists all secret versions for a given secret.
    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to list versions for (e.g., 'my-secret').
    """
    client = secretmanager_v1beta2.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        found_versions = False
        for version in client.list_secret_versions(parent=secret_name):
            found_versions = True
            print(f"  Secret Version: {version.name}, State: {version.state.name}")
        if not found_versions:
            print(f"No versions found for secret {secret_id}")


    except exceptions.NotFound:
        print(f"Error: Secret '{secret_name}' not found. Please ensure the secret ID and project ID are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, secret ID, and ensure you have the necessary permissions.")


# [END secretmanager_v1beta2_secretmanagerservice_secretversions_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List all secret versions for a given secret."
    )
    parser.add_argument(
        "--project_id", required=True, type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id",required=True, type=str,
        help="The ID of the secret to list versions for (e.g., 'my-secret').",
    )
    args = parser.parse_args()
    list_secret_versions_sample(args.project_id, args.secret_id)
