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

# [START speech_v2_speech_phrasesets_list]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v2


def list_phrase_sets(
    project_id: str,
) -> None:
    """
    Lists existing PhraseSets in a given project

    PhraseSets are resources that allow you to provide hints to the Speech-to-Text
    recognizer to favor specific words and phrases, which can improve recognition
    accuracy for domain-specific terms.

    Args:
        project_id: The Google Cloud project ID.
    """
    # The `with` statement ensures the client is properly closed when the block is exited.
    # It's a recommended practice for managing client lifecycle.

    client = speech_v2.SpeechClient()

    # The parent resource path
    parent = client.common_location_path(project=project_id, location="global")

    # Construct the request
    request = speech_v2.ListPhraseSetsRequest(parent=parent)

    try:
        page_result = client.list_phrase_sets(request=request)

        print(f"PhraseSets in {parent}:")
        found_phrase_sets = False
        for phrase_set in page_result:
            found_phrase_sets = True
            print(f"  - {phrase_set.name}")

        if not found_phrase_sets:
            print("  No PhraseSets found.")

    except NotFound as e:
        print(f"Error: The specified project was not found: {e}")
        print("Please ensure that the project ID is correct.")
    except Exception as e:
        # Catch any other unexpected errors and provide an informative message.
        print(f"An unexpected error occurred: {e}")
        print("Please check your network connection or API permissions.")


# [END speech_v2_speech_phrasesets_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists PhraseSets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    args = parser.parse_args()

    list_phrase_sets(args.project_id)
