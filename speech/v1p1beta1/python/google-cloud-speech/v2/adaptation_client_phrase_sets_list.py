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

# [START speech_v1p1beta1_adaptation_phraseset_list]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v1p1beta1


def list_phrase_sets(
    project_id: str,
) -> None:
    """
    Lists phrase sets in a given location.

    Phrase sets are custom lists of words or phrases that can be used to improve
    the accuracy of speech recognition for specific terminology.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full location path
    parent = client.common_location_path(project_id, location="global")

    try:
        page_result = client.list_phrase_set(parent=parent)

        print(f"Phrase Sets in {parent}:")
        found_phrase_sets = False
        for phrase_set in page_result:
            found_phrase_sets = True
            print(f"- {phrase_set.name}")

        if not found_phrase_sets:
            print("No phrase sets found.")

    except NotFound as e:
        print(f"Error: The specified parent location '{parent}' was not found.")
        print(
            "Please ensure the project ID and location are correct and the Speech-to-Text API is enabled."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_phraseset_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists phrase sets in a given location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()

    list_phrase_sets(args.project_id)
