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

# [START speech_v1p1beta1_adaptation_phraseset_update]
from google.api_core import exceptions
from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1.types import PhraseSet
from google.protobuf import field_mask_pb2


def update_phrase_set_sample(
    project_id: str,
    phrase_set_id: str,
    new_phrase_value: str,
    new_phrase_boost: float,
    new_phrase_set_boost: float,
) -> None:
    """
    Updates an existing PhraseSet with new phrases and/or a new boost value.

    The `update_phrase_set` method performs a PATCH operation. To add a new phrase
    or modify existing ones, you must first retrieve the current PhraseSet,
    modify its `phrases` list, and then send the updated object along with a
    `FieldMask` indicating which fields have changed.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the PhraseSet to update.
        new_phrase_value: The text value of the new phrase to add to the PhraseSet.
        new_phrase_boost: The boost value for the new phrase (e.g., 10.0).
        new_phrase_set_boost: The new overall boost value for the PhraseSet (e.g., 12.0).
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full resource name for the PhraseSet
    phrase_set_name = client.phrase_set_path(
        project_id, location="global", phrase_set=phrase_set_id
    )

    try:
        existing_phrase_set = client.get_phrase_set(name=phrase_set_name)
        print(f"Retrieved PhraseSet: {existing_phrase_set.name}")
        print(f"Current phrases: {[p.value for p in existing_phrase_set.phrases]}")
        print(f"Current phrase set boost: {existing_phrase_set.boost}")

        # 2. Modify the existing PhraseSet object
        # Create a new Phrase object
        new_phrase = PhraseSet.Phrase(value=new_phrase_value, boost=new_phrase_boost)

        # Append the new phrase to the existing list of phrases
        existing_phrase_set.phrases.append(new_phrase)

        # Update the overall phrase set boost
        existing_phrase_set.boost = new_phrase_set_boost

        # 3. Create a FieldMask to specify which fields are being updated
        # In this case, we are updating the 'phrases' list and the 'boost' value
        update_mask = field_mask_pb2.FieldMask(paths=["phrases", "boost"])

        # 4. Call the update_phrase_set method
        print(
            f"Updating PhraseSet: {phrase_set_name} with new phrase '{new_phrase_value}' and boost {new_phrase_set_boost}..."
        )
        updated_phrase_set = client.update_phrase_set(
            phrase_set=existing_phrase_set,
            update_mask=update_mask,
        )

        print("PhraseSet updated successfully!")
        print(f"Updated PhraseSet Name: {updated_phrase_set.name}")
        print(f"Updated Phrases: {[p.value for p in updated_phrase_set.phrases]}")
        print(f"Updated Phrase Set Boost: {updated_phrase_set.boost}")

    except exceptions.NotFound:
        print(
            f"Error: PhraseSet '{phrase_set_id}' not found in project '{project_id}'."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_phraseset_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing PhraseSet in Google Cloud Speech-to-Text."
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
        default="my-example-phrase-set",
        help="The ID of the PhraseSet to update.",
    )
    parser.add_argument(
        "--new_phrase_value",
        type=str,
        default="new updated phrase",
        help="The text value of the new phrase to add to the PhraseSet.",
    )
    parser.add_argument(
        "--new_phrase_boost",
        type=float,
        default=18.0,
        help="The boost value for the new phrase (e.g., 10.0).",
    )
    parser.add_argument(
        "--new_phrase_set_boost",
        type=float,
        default=12.0,
        help="The new overall boost value for the PhraseSet (e.g., 12.0).",
    )

    args = parser.parse_args()
    update_phrase_set_sample(
        args.project_id,
        args.phrase_set_id,
        args.new_phrase_value,
        args.new_phrase_boost,
        args.new_phrase_set_boost,
    )
