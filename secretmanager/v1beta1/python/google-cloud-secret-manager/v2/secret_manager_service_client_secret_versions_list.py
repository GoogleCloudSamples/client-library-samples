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

# [START secretmanager_v1beta1_secretmanagerservice_secretversions_list]
from google.api_core.exceptions import NotFound
from google.cloud import secretmanager_v1beta1


def list_secret_versions(
    project_id: str,
    secret_id: str,
) -> None:
    """
    Lists all secret versions for a given secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret whose versions to list.
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()
    parent = client.secret_path(project_id, secret_id)

    try:
        print(f"Listing secret versions for secret: {parent}")
        found_versions = False
        for version in client.list_secret_versions(parent=parent):
            found_versions = True
            print(f"  Secret Version: {version.name}, State: {version.state.name}")
            if version.create_time:
                print(f"    Created: {version.create_time.isoformat()}")
            if version.destroy_time:
                print(f"    Destroyed: {version.destroy_time.isoformat()}")
        if not found_versions:
            print("    No versions found.")

    except NotFound as e:
        print(
            f"Error: The secret '{secret_id}' in project '{project_id}' was not found."
        )
        print(
            f"Please ensure the secret exists and you have the necessary permissions."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_secretversions_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List secret versions for a given secret."
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
        help="The ID of the secret whose versions to list.",
    )
    args = parser.parse_args()

    list_secret_versions(args.project_id, args.secret_id)
