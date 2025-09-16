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

# [START speech_v1_adaptation_phraseset_update]
from google.api_core import exceptions
from google.cloud import speech_v1
from google.protobuf import field_mask_pb2


def update_phrase_set(
    project_id: str,
    phrase_set_id: str,
    new_phrases: list[str],
) -> None:
    """Updates an existing PhraseSet with new phrases.

    This sample demonstrates how to update a PhraseSet, which can improve
    speech recognition accuracy for specific words and phrases.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the phrase set to update.
        new_phrases: A list of strings representing the new phrases to set in
                     the PhraseSet.
    """
    client = speech_v1.AdaptationClient()

    # Construct the full resource name of the phrase set
    phrase_set_name = client.phrase_set_path(
        project_id, location="global", phrase_set=phrase_set_id
    )

    # Create Phrase objects from the new_phrases list
    phrases_for_update = [
        speech_v1.PhraseSet.Phrase(value=phrase) for phrase in new_phrases
    ]

    # Create a PhraseSet object with the name and the updated phrases
    # The name is crucial for identifying which PhraseSet to update.
    phrase_set = speech_v1.PhraseSet(name=phrase_set_name, phrases=phrases_for_update)

    # Create an update mask to specify that only the 'phrases' field should be updated.
    # If you wanted to update other fields (e.g., 'boost'), you would add them here.
    update_mask = field_mask_pb2.FieldMask(paths=["phrases"])

    # Construct the update request
    request = speech_v1.UpdatePhraseSetRequest(
        phrase_set=phrase_set, update_mask=update_mask
    )

    try:
        # Make the API call
        response = client.update_phrase_set(request=request)

        # Print the response details
        print(f"Successfully updated phrase set: {response.name}")
        print("Updated phrases:")
        for phrase in response.phrases:
            print(f"- {phrase.value}")

    except exceptions.NotFound:
        print(f"Error: Phrase set '{phrase_set_name}' not found.")
        print("Please ensure the project ID, location, and phrase set ID are correct.")
        print("You might need to create the phrase set first if it doesn't exist.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_phraseset_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing PhraseSet in Google Cloud Speech-to-Text."
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
        help="The ID of the phrase set to update.",
    )
    parser.add_argument(
        "--new_phrases",
        nargs="+",
        default=["hello world", "new phrase here"],
        help="A space-separated list of new phrases to update the PhraseSet with.",
    )

    args = parser.parse_args()

    update_phrase_set(
        args.project_id,
        args.phrase_set_id,
        args.new_phrases,
    )
