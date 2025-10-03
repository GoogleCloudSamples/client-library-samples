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

# [START secretmanager_v1beta1_secretmanagerservice_secret_update]
from google.api_core import exceptions
from google.cloud import secretmanager_v1beta1
from google.protobuf import field_mask_pb2


def update_secret(
    project_id: str,
    secret_id: str,
    new_label_key: str = "my-new-key",
    new_label_value: str = "my-new-label",
) -> None:
    """
    Updates the metadata of an existing secret, such as its labels.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to update.
        new_label_key: The key for the new label to add or update.
        new_label_value: The value for the new label.
    """
    client = secretmanager_v1beta1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        # Create a Secret object with the updated fields.
        # In this example, we are updating the 'labels' field.
        # Note: When updating a secret, you only need to provide the fields
        # that you intend to change, along with the secret's name.
        updated_secret = secretmanager_v1beta1.Secret(
            name=secret_name,
            labels={new_label_key: new_label_value},
        )

        # Create a FieldMask to specify which fields are being updated.
        # Only fields specified in the update_mask will be modified.
        update_mask = field_mask_pb2.FieldMask(paths=["labels"])

        secret = client.update_secret(secret=updated_secret, update_mask=update_mask)

        print(f"Successfully updated secret: {secret.name}")
        print(f"New labels: {secret.labels}")

    except exceptions.NotFound:
        print(
            f"Error: Secret '{secret_name}' not found. "
            "Please ensure the secret exists before attempting to update it."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Error updating secret '{secret_name}' due to a precondition failure: {e}. "
            "Check the secret's current state and try again."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred while updating secret '{secret_name}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_secret_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a secret's metadata in Secret Manager."
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
        help="The ID of the secret to update.",
    )
    parser.add_argument(
        "--new_label_key",
        type=str,
        default="my-new-key",
        help="The key for the new label to add or update.",
    )
    parser.add_argument(
        "--new_label_value",
        type=str,
        default="my-new-label",
        help="The value for the new label.",
    )

    args = parser.parse_args()

    update_secret(
        args.project_id,
        args.secret_id,
        args.new_label_key,
        args.new_label_value,
    )
