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

# [START secretmanager_v1beta1_secretmanagerservice_secretversion_get]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta1


def get_secret_version(
    project_id: str,
    secret_id: str,
    version_id: str,
) -> None:
    """
    Gets metadata for a specific secret version.

    Args:
        project_id: The ID of the Google Cloud project.
        secret_id: The ID of the secret to retrieve the version from.
        version_id: The ID of the secret version to retrieve (e.g., '1', '2', or 'latest').
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()

    name = client.secret_version_path(project_id, secret_id, version_id)

    try:
        response = client.get_secret_version(name=name)

        print(f"Successfully retrieved secret version: {response.name}")
        print(f"  State: {response.state.name}")
        print(f"  Created: {response.create_time.strftime('%Y-%m-%d %H:%M:%S UTC')}")
        if response.destroy_time:
            print(
                f"  Destroyed: {response.destroy_time.strftime('%Y-%m-%d %H:%M:%S UTC')}"
            )

    except exceptions.NotFound as e:
        print(f"Error: Secret version '{name}' not found.")
        print(f"Please ensure the project ID, secret ID, and version ID are correct.")
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while accessing secret version '{name}': {e}")
        print(f"Please check your permissions and the resource name.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_secretversion_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get metadata for a specific secret version."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--secret_id",
        help="The ID of the secret.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--version_id",
        help="The ID of the secret version (e.g., '1', '2', or 'latest').",
        required=True,
        type=str,
    )
    args = parser.parse_args()

    get_secret_version(args.project_id, args.secret_id, args.version_id)
