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

# [START speech_v2_speech_recognizer_update]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2


def update_recognizer(
    project_id: str, recognizer_id: str, new_display_name: str
) -> None:
    """
    Updates an existing Recognizer with a new display name.

    This sample demonstrates how to update specific fields of a Recognizer
    resource using an update mask.

    Args:
        project_id: The Google Cloud project ID.
        recognizer_id: The ID of the recognizer to update.
        new_display_name: The new display name for the recognizer.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name of the recognizer.
    recognizer_name = client.recognizer_path(
        project_id, location="global", recognizer=recognizer_id
    )

    # Create a Recognizer object with the updated field(s).
    # Only fields specified in the update_mask will be updated.
    recognizer = speech_v2.Recognizer(
        name=recognizer_name,
        display_name=new_display_name,
    )

    # Create an update mask to specify which fields to update.
    # In this case, we are only updating the 'display_name'.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        # Send the update request. This is a long-running operation.
        operation = client.update_recognizer(
            recognizer=recognizer, update_mask=update_mask
        )

        print("Waiting for operation to complete...")
        updated_recognizer = operation.result()

        print("Recognizer updated successfully:")
        print(f"Name: {updated_recognizer.name}")
        print(f"Display Name: {updated_recognizer.display_name}")
        print(f"State: {updated_recognizer.state.name}")

    except NotFound:
        print(f"Error: Recognizer '{recognizer_name}' not found.")
        print("Please ensure the recognizer ID is correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_recognizer_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Speech-to-Text Recognizer."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--recognizer_id",
        type=str,
        required=True,
        help="The ID of the recognizer to update.",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        default="My Updated Recognizer",
        help="The new display name for the recognizer.",
    )

    args = parser.parse_args()

    update_recognizer(
        args.project_id,
        args.recognizer_id,
        args.new_display_name,
    )
