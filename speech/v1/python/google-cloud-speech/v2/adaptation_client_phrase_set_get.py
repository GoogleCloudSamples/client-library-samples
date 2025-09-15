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

# [START speech_v1_adaptation_phraseset_get]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v1p1beta1 as speech


def get_phrase_set(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """
    Retrieves a specific phrase set.

    This sample demonstrates how to fetch the details of an existing phrase set
    from the Google Cloud Speech-to-Text API.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the phrase set to retrieve.
                       Format: 'your-phrase-set-id'
    """
    client = speech.AdaptationClient()

    # Construct the full resource name of the phrase set.
    phrase_set_name = client.phrase_set_path(
        project_id, location="global", phrase_set=phrase_set_id
    )

    try:
        phrase_set = client.get_phrase_set(name=phrase_set_name)

        print(f"Successfully retrieved phrase set: {phrase_set.name}")
        print(f"Display Name: {phrase_set.display_name}")
        if phrase_set.phrases:
            print("Phrases:")
            for phrase in phrase_set.phrases:
                print(f"  - Value: '{phrase.value}', Boost: {phrase.boost}")
        else:
            print("No phrases found in this phrase set.")
        print(f"Boost: {phrase_set.boost}")

    except NotFound:
        print(f"Error: Phrase set '{phrase_set_name}' not found.")
        print("Please ensure the project ID, location, and phrase set ID are correct.")
        print("You might need to create the phrase set first if it does not exist.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_phraseset_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific phrase set from Google Cloud Speech-to-Text."
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
        help="The ID of the phrase set to retrieve.",
    )

    args = parser.parse_args()

    get_phrase_set(args.project_id, args.phrase_set_id)
