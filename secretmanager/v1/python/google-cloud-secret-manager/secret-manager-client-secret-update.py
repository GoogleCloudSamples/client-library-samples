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

# [START secretmanager_v1_secretmanagerservice_secret_update]
import google.api_core.exceptions
from google.cloud import secretmanager_v1
from google.protobuf import field_mask_pb2


def update_secret(project_id: str, secret_id: str) -> None:
    """Updates an existing secret resource. This demonstrates how to modify a secret's configuration, such as replication policy or labels.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret to update (such as 'my-secret-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}"

    try:
        secret = secretmanager_v1.Secret(
            name=name,
            labels={"purpose": "demo", "environment": "staging"},
        )

        update_mask = field_mask_pb2.FieldMask(paths=["labels"])

        updated_secret = client.update_secret(
            request={"secret": secret, "update_mask": update_mask}
        )

        print(f"Updated secret: {updated_secret.name}")
        print(f"  Labels: {updated_secret.labels}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: The secret '{name}' was not found. Verify the "
            "secret exists before the update occurs."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_update]
