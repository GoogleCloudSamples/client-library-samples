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

# [START speech_v2_speech_config_update]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2
from google.cloud.speech_v2.types import Config
from google.protobuf.field_mask_pb2 import FieldMask


def update_speech_config(
    project_id: str,
    kms_key_name: str,
) -> None:
    """
    Updates the Speech-to-Text API configuration for a specific project.

    This sample demonstrates how to update the KMS key name associated with the
    Speech-to-Text API configuration. The configuration resource is
    `projects/{project}/locations/{location}/config`.

    Args:
        project_id: The Google Cloud project ID.
        kms_key_name: The new KMS key name to associate with the Speech-to-Text
                      configuration. Format:
                      `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.
    """
    client = speech_v2.SpeechClient()

    # The config resource is typically "global" for most Speech-to-Text API configurations.
    config_name = client.config_path(project_id, "global")

    # Create a Config object with the fields to update.
    # Only the 'kms_key_name' field is being updated in this example.
    updated_config = Config(
        name=config_name,
        kms_key_name=kms_key_name,
    )

    # Create a FieldMask to specify which fields of the Config object are being updated.
    # If update_mask is empty, all non-default valued fields are considered for update.
    # Here, we explicitly specify 'kms_key_name'.
    update_mask = FieldMask(paths=["kms_key_name"])

    try:
        response = client.update_config(
            config=updated_config,
            update_mask=update_mask,
        )

        print(f"Successfully updated Speech-to-Text configuration for: {response.name}")
        print(f"New KMS Key Name: {response.kms_key_name}")
        print(f"Last updated time: {response.update_time.isoformat()}")

    except NotFound as e:
        print(
            f"Error: Speech-to-Text configuration not found for project '{project_id}'."
        )
        print("Please ensure the project ID is correct.")
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(
            "Please check your project ID and KMS key name are valid and you have the necessary permissions."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_config_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates the Speech-to-Text API configuration."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--kms_key_name",
        type=str,
        help="The new KMS key name to associate with the Speech-to-Text configuration. "
        "Format: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}",
    )

    args = parser.parse_args()

    update_speech_config(
        project_id=args.project_id,
        kms_key_name=args.kms_key_name,
    )
