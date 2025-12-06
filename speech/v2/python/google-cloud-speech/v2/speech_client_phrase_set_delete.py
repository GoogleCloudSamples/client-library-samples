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

# [START speech_v2_speech_phraseset_delete]
from google.api_core import exceptions
from google.cloud import speech_v2


def delete_phrase_set(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """Deletes a PhraseSet from Google Cloud Speech-to-Text.

    PhraseSets are used to provide hints to the speech recognizer to favor
    specific words and phrases in the results, improving recognition accuracy.
    Deleting a PhraseSet removes it from use in speech recognition.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the PhraseSet to delete.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name of the phrase set
    phrase_set_name = client.phrase_set_path(project_id, "global", phrase_set_id)

    try:
        # Send the delete request. The operation will complete when the
        # PhraseSet is fully deleted.
        operation = client.delete_phrase_set(name=phrase_set_name)
        operation.result()

        print(f"Successfully deleted phrase set: {phrase_set_name}")

    except exceptions.NotFound:
        print(
            f"Phrase set {phrase_set_name} not found. "
            "It may have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v2_speech_phraseset_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a PhraseSet from Google Cloud Speech-to-Text."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--phrase_set_id",
        type=str,
        required=True,
        help="The ID of the PhraseSet to delete.",
    )

    args = parser.parse_args()

    delete_phrase_set(args.project_id, args.phrase_set_id)
