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

# [START speech_v2_speech_phraseset_update]
import sys

from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2


def update_phrase_set(
    project_id: str,
    phrase_set_id: str,
    new_display_name: str,
    new_phrase_value: str,
) -> None:
    """Updates an existing PhraseSet with a new display name and phrases.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the PhraseSet to update.
        new_display_name: The new display name for the PhraseSet.
        new_phrase_value: A new phrase value to include in the PhraseSet.
    """
    client = speech_v2.SpeechClient()

    phrase_set_name = client.phrase_set_path(
        project=project_id, location="global", phrase_set=phrase_set_id
    )

    # Create a PhraseSet object with the desired updates.
    # Only fields specified in the update_mask will be updated.
    # Note: Providing a list of phrases here will REPLACE any existing phrases
    # in the PhraseSet if 'phrases' is included in the update_mask.
    # To append to existing phrases, you would first need to retrieve the
    # current PhraseSet using client.get_phrase_set, modify its phrases list,
    # and then send the updated PhraseSet.
    updated_phrase_set = speech_v2.PhraseSet(
        name=phrase_set_name,
        display_name=new_display_name,
        phrases=[
            speech_v2.PhraseSet.Phrase(value=new_phrase_value, boost=15.0),
            speech_v2.PhraseSet.Phrase(value="updated term", boost=10.0),
        ],
    )

    # Create a FieldMask to specify which fields to update.
    # In this example, we are updating both the display_name and the phrases.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "phrases"])

    try:
        operation = client.update_phrase_set(
            phrase_set=updated_phrase_set, update_mask=update_mask
        )

        print("Waiting for operation to complete for PhraseSet: " f"{phrase_set_name}")
        response = operation.result()

        print(f"Successfully updated PhraseSet: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print("Updated Phrases:")
        for phrase in response.phrases:
            print(f"  - Value: '{phrase.value}', Boost: {phrase.boost}")
        print(f"Last updated: {response.update_time.isoformat()}")

    except NotFound:
        print(
            f"Error: PhraseSet '{phrase_set_name}' not found. "
            "Ensure the PhraseSet exists before attempting to update it.",
            file=sys.stderr,
        )
    except GoogleAPICallError as e:
        print(f"Google Cloud API Error: {e}", file=sys.stderr)
        print("Please check your project ID and permissions.", file=sys.stderr)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)


# [END speech_v2_speech_phraseset_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Google Cloud Speech PhraseSet."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--phrase_set_id",
        type=str,
        required=True,
        help="The ID of the existing PhraseSet to update.",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        required=True,
        help="The new display name for the PhraseSet.",
    )
    parser.add_argument(
        "--new_phrase_value",
        type=str,
        required=True,
        help=(
            "A new phrase to include in the PhraseSet " "(replaces existing phrases)."
        ),
    )

    args = parser.parse_args()

    update_phrase_set(
        args.project_id,
        args.phrase_set_id,
        args.new_display_name,
        args.new_phrase_value,
    )
