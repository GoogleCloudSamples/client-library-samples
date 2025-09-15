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

# [START speech_v1_adaptation_phraseset_delete]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v1


def delete_phrase_set(project_id: str, phrase_set_id: str) -> None:
    """Deletes a phrase set.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the phrase set to delete.
    """
    client = speech_v1.AdaptationClient()

    # Construct the full resource name of the phrase set.
    name = client.phrase_set_path(
        project_id, location="global", phrase_set=phrase_set_id
    )

    try:
        client.delete_phrase_set(name=name)
        print(f"Phrase set {name} deleted successfully.")
    except NotFound:
        print(
            f"Phrase set {name} not found. It might have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An error occurred while deleting phrase set {name}: {e}")


# [END speech_v1_adaptation_phraseset_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a phrase set in Google Cloud Speech-to-Text."
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
        help="The ID of the phrase set to delete.",
    )

    args = parser.parse_args()

    delete_phrase_set(args.project_id, args.phrase_set_id)
