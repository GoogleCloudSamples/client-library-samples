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

# [START speech_v1_adaptation_phraseset_create]
from google.api_core import exceptions
from google.cloud import speech_v1p1beta1 as speech


def create_phrase_set(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """
    Creates a PhraseSet resource in the Google Cloud Speech-to-Text API.

    A PhraseSet contains a list of phrases that can be used to bias the speech
    recognition model towards specific words or phrases, improving accuracy.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID to use for the new PhraseSet.
    """
    client = speech.AdaptationClient()

    # Construct the full location path.
    parent = f"projects/{project_id}/locations/global"

    # Create the PhraseSet object.
    phrase_set = speech.PhraseSet(
        phrases=[
            speech.PhraseSet.Phrase(value="Google Cloud"),
            speech.PhraseSet.Phrase(value="Speech-to-Text API", boost=10.0),
            speech.PhraseSet.Phrase(value="adaptation"),
        ]
    )

    # Construct the request to create the PhraseSet.
    request = speech.CreatePhraseSetRequest(
        parent=parent,
        phrase_set_id=phrase_set_id,
        phrase_set=phrase_set,
    )

    try:
        response = client.create_phrase_set(request=request)

        print(f"Successfully created PhraseSet: {response.name}")
        print(f"Phrases: {[p.value for p in response.phrases]}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: PhraseSet '{phrase_set_id}' already exists. Please use a unique ID."
        )
        print(f"Details: {e}")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for creating PhraseSet: {e}")
        print("Please ensure the phrase_set_id is valid.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_phraseset_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a PhraseSet in Google Cloud Speech-to-Text."
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
        help="The ID for the new PhraseSet (e.g., 'my-custom-phrases').",
    )

    args = parser.parse_args()

    create_phrase_set(args.project_id, args.phrase_set_id)
