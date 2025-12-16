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

# [START secretmanager_v1_secretmanagerservice_secret_update]
from google.api_core import exceptions
from google.cloud import secretmanager_v1
from google.protobuf import field_mask_pb2


def update_secret_labels(
    project_id: str,
    secret_id: str,
    label_key: str = "my-new-key",
    label_value: str = "my-new-value",
) -> None:
    """Updates an existing secret.

    The update_secret method allows for partial updates using a field mask.
    This example demonstrates updating only the 'labels' field of a secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to update.
        label_key: The key of the label to add or update.
        label_value: The value of the label to add or update.
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)

    try:
        secret = client.get_secret(name=secret_name)

        # This will add or overwrite the specified label.
        # To remove a label, set its value to an empty string or omit it
        # from the update request if not using a field mask for specific labels.
        secret.labels[label_key] = label_value

        # Create a field mask to tell the API which fields to update.
        # In this case, we only want to update the 'labels' field.
        update_mask = field_mask_pb2.FieldMask(paths=["labels"])

        updated_secret = client.update_secret(secret=secret, update_mask=update_mask)

        print(f"Successfully updated secret: {updated_secret.name}")
        print(f"New labels: {updated_secret.labels}")

    except exceptions.NotFound:
        print(f"Error: Secret '{secret_name}' not found.")
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided for updating secret "
            f"'{secret_name}'. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Secret Manager secret's labels."
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
        "--label_key",
        type=str,
        default="my-new-label",
        help="The key of the label to add or update.",
    )
    parser.add_argument(
        "--label_value",
        type=str,
        default="my-new-value",
        help="The value of the label to add or update.",
    )
    args = parser.parse_args()

    update_secret_labels(
        args.project_id,
        args.secret_id,
        args.label_key,
        args.label_value,
    )
