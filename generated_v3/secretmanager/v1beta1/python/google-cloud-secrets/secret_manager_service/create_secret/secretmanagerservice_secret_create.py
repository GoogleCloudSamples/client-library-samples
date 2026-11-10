# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START secretmanager_v1beta1_secretmanagerservice_secret_create]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1

client = secretmanager_v1beta1.SecretManagerServiceClient()


def create_secret(project_id: str, secret_id: str) -> None:
    """Use the create_secret method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        secret_id: ID of the Secret (for example, 'example-secret-id')
    """
    parent = f"projects/{project_id}"
    secret = secretmanager_v1beta1.Secret(
        replication=secretmanager_v1beta1.Replication(
            automatic=secretmanager_v1beta1.Replication.Automatic()
        )
    )

    try:
        response = client.create_secret(
            parent=parent,
            secret_id=secret_id,
            secret=secret,
        )
        print(f"Created secret: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create secret: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_secret_create]
