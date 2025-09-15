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

# [START speech_v1p1beta1_adaptation_phraseset_delete]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v1p1beta1


def delete_phrase_set_sample(
    project_id: str,
    phrase_set_id: str,
) -> None:
    """
    Deletes a specific phrase set.

    Args:
        project_id: The Google Cloud project ID.
        phrase_set_id: The ID of the phrase set to delete.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full resource name for the phrase set.
    phrase_set_name = client.phrase_set_path(
        project_id, location="global", phrase_set=phrase_set_id
    )

    try:
        client.delete_phrase_set(name=phrase_set_name)
        print(f"Phrase set {phrase_set_name} deleted successfully.")
    except NotFound:
        print(
            f"Error: Phrase set {phrase_set_name} not found. "
            "Please check the project ID, location, and phrase set ID."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_phraseset_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Google Cloud Speech phrase set."
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
        help=("The ID of the phrase set to delete."),
    )

    args = parser.parse_args()

    delete_phrase_set_sample(args.project_id, args.phrase_set_id)
