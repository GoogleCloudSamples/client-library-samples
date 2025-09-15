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

# [START speech_v2_speech_phraseset_create]
from google.api_core import exceptions
from google.cloud import speech_v2


def create_phrase_set(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """
    Creates a PhraseSet resource in Google Cloud Speech-to-Text V2.

    A PhraseSet is used to provide "hints" to the speech recognizer to favor
    specific words and phrases in the results, improving recognition accuracy
    for domain-specific terms.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID to use for the PhraseSet, which will become the
                       final component of the PhraseSet's resource name.
                       This value should be 4-63 characters, and valid
                       characters are /[a-z][0-9]-/.
    """
    client = speech_v2.SpeechClient()

    # Construct the full location path.
    parent = f"projects/{project_id}/locations/global"

    # Define the PhraseSet to be created.
    # This example includes a few phrases with different boost values.
    phrase_set = speech_v2.PhraseSet(
        display_name="My Example PhraseSet",
        phrases=[
            speech_v2.PhraseSet.Phrase(value="Google Cloud", boost=10.0),
            speech_v2.PhraseSet.Phrase(value="Speech to Text API", boost=8.0),
            speech_v2.PhraseSet.Phrase(value="transcription service"),
        ],
    )

    try:
        # Send the create request.
        operation = client.create_phrase_set(
            parent=parent,
            phrase_set=phrase_set,
            phrase_set_id=phrase_set_id,
        )

        # Wait for the operation to complete.
        response = operation.result()

        print(f"Successfully created PhraseSet: {response.name}")
        print(f"Display Name: {response.display_name}")
        for phrase in response.phrases:
            print(f"  Phrase: '{phrase.value}', Boost: {phrase.boost}")

    except exceptions.AlreadyExists as e:
        print(f"Error: PhraseSet '{phrase_set_id}' already exists in {parent}.")
        print(
            f"Please try a different phrase_set_id or delete the existing one. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_phraseset_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a PhraseSet resource in Google Cloud Speech-to-Text V2."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--phrase_set_id",
        type=str,
        required=True,
        help=(
            "The ID to use for the PhraseSet. This will be the final component of "
            "the PhraseSet's resource name (e.g., 'my-unique-phrase-set-123')."
        ),
    )

    args = parser.parse_args()

    create_phrase_set(args.project_id, args.phrase_set_id)
