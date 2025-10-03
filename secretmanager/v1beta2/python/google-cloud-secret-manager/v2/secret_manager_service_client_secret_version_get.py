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

# [START secretmanager_v1beta2_secretmanagerservice_secretversion_get]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta2


def get_secret_version_sample(
    project_id: str,
    secret_id: str,
    version_id: str,
) -> None:
    """
    Get metadata for a specific SecretVersion.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret whose version metadata to retrieve.
        version_id: The ID of the secret version to retrieve (e.g., '1', '2', or 'latest').
    """
    try:
        client = secretmanager_v1beta2.SecretManagerServiceClient()

        name = client.secret_version_path(project_id, secret_id, version_id)

        version = client.get_secret_version(name=name)

        print(f"Successfully retrieved secret version: {version.name}")
        print(f"  State: {version.state.name}")
        print(f"  Created: {version.create_time.strftime('%Y-%m-%d %H:%M:%S UTC')}")
        if version.destroy_time:
            print(
                f"  Destroyed: {version.destroy_time.strftime('%Y-%m-%d %H:%M:%S UTC')}"
            )

    except exceptions.NotFound as e:
        print(
            f"Error: Secret version '{secret_id}/{version_id}' not found in project '{project_id}'."
        )
        print(f"Please ensure the secret ID and version ID are correct and exist.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(f"Please check your project ID, secret ID, and version ID.")


# [END secretmanager_v1beta2_secretmanagerservice_secretversion_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get metadata for a specific SecretVersion."
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
        help="The ID of the secret whose version metadata to retrieve.",
    )
    parser.add_argument(
        "--version_id",
        type=str,
        required=True,
        help="The ID of the secret version to retrieve (e.g., '1', '2', or 'latest').",
    )

    args = parser.parse_args()

    get_secret_version_sample(
        args.project_id,
        args.secret_id,
        args.version_id,
    )
