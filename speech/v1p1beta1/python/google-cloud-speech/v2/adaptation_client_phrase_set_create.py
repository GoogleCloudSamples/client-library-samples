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

# [START speech_v1p1beta1_adaptation_phraseset_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import types


def create_phrase_set(project_id: str, phrase_set_id: str, phrases: list[str]) -> None:
    """Creates a phrase set for Speech-to-Text adaptation.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID to use for the phrase set.
        phrases: A list of strings to include in the phrase set.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full path for the parent resource.
    parent = client.common_location_path(project_id, location="global")

    # Create PhraseSet.Phrase objects from the input list of strings
    phrase_set_phrases = [types.PhraseSet.Phrase(value=p) for p in phrases]

    # Construct the PhraseSet object
    phrase_set = types.PhraseSet(phrases=phrase_set_phrases)

    try:
        request = types.CreatePhraseSetRequest(
            parent=parent,
            phrase_set_id=phrase_set_id,
            phrase_set=phrase_set,
        )

        response = client.create_phrase_set(request=request)

        print(f"Successfully created phrase set: {response.name}")

    except AlreadyExists:
        print(f"Phrase set '{phrase_set_id}' already exists in '{project_id}'.")
        print("Consider updating it instead or using a different phrase_set_id.")
    except GoogleAPICallError as e:
        print(f"Error creating phrase set: {e}")


# [END speech_v1p1beta1_adaptation_phraseset_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a phrase set for Speech-to-Text adaptation."
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
        help=("The ID to use for the phrase set."),
    )
    parser.add_argument(
        "--phrases",
        type=str,
        default=["hello world", "goodbye moon"],
        help="Comma-separated list of phrases to include in the phrase set.",
    )

    args = parser.parse_args()

    create_phrase_set(args.project_id, args.phrase_set_id, args.phrases)
