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

# [START secretmanager_v1beta1_secretmanagerservice_secret_update]
import google.api_core.exceptions
from google.cloud import secretmanager_v1beta1
from google.protobuf import field_mask_pb2

client = secretmanager_v1beta1.SecretManagerServiceClient()


def update_secret(project_id: str, secret_id: str) -> None:
    """Update metadata of an existing secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The caller-provided ID of the secret to update.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    secret = secretmanager_v1beta1.Secret(
        name=f"projects/{project_id}/secrets/{secret_id}",
        labels={"env": "staging"},
    )

    try:
        response = client.update_secret(
            secret=secret,
            update_mask=update_mask,
        )
        print(f"Updated secret: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update secret: {error}")
# [END secretmanager_v1beta1_secretmanagerservice_secret_update]
