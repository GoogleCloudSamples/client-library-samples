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

# [START speech_v2_speech_phraseset_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2


def get_phrase_set(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """
    Retrieves a specific PhraseSet resource.

    A PhraseSet is a collection of words or phrases that can be used to bias
    the speech recognition process, making the recognizer more likely to
    detect these specific terms in the audio.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the PhraseSet to retrieve.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name of the PhraseSet.
    name = client.phrase_set_path(
        project=project_id, location="global", phrase_set=phrase_set_id
    )

    try:
        request = speech_v2.GetPhraseSetRequest(name=name)
        phrase_set = client.get_phrase_set(request=request)

        print(f"Display Name: {phrase_set.display_name}")
        if phrase_set.phrases:
            print("Phrases:")
            for phrase in phrase_set.phrases:
                print(f"  - {phrase.value} (Boost: {phrase.boost})")
        else:
            print("No phrases defined in this PhraseSet.")

    except NotFound:
        print(f"Error: PhraseSet '{phrase_set_id}' not found.")
        print("Please ensure the PhraseSet ID is correct.")
        print("You might need to create the PhraseSet first if it does not exist.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and network connection.")


# [END speech_v2_speech_phraseset_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific PhraseSet resource."
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
        help="The ID of the PhraseSet to retrieve.",
    )

    args = parser.parse_args()

    get_phrase_set(args.project_id, args.phrase_set_id)
