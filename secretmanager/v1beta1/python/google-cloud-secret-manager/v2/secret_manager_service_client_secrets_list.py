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

# [START secretmanager_v1beta1_secretmanagerservice_secrets_list]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta1


def list_secrets(project_id: str) -> None:
    """
    Lists all secrets within a given Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    try:
        for secret in client.list_secrets(parent=parent):
            print(f"Found secret: {secret.name}")
    except exceptions.NotFound:
        print(f"Project '{project_id}' not found or no secrets exist within it.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_secrets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List secrets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    args = parser.parse_args()

    list_secrets(args.project_id)
