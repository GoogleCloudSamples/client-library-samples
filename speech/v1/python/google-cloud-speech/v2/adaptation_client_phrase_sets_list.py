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

# [START speech_v1_adaptation_phraseset_list]
from google.api_core.exceptions import InvalidArgument, NotFound, PermissionDenied
from google.cloud import speech_v1 as speech


def list_phrase_sets(
    project_id: str,
) -> None:
    """
    Lists all PhraseSets in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech.AdaptationClient()

    # Construct the parent path for the request.
    parent = client.common_location_path(project=project_id, location="global")

    try:
        # Send the ListPhraseSet request.
        # The response is a paginated iterable of PhraseSet objects.
        page_result = client.list_phrase_set(parent=parent)

        print(f"PhraseSets found in {parent}:")
        found_any = False
        for phrase_set in page_result:
            found_any = True
            print(f"- {phrase_set.name}")

        if not found_any:
            print(f"No PhraseSets found in {parent}.")

    except NotFound:
        print(
            f"Error: The specified project or location '{parent}' was not found "
            "or does not exist. Please check your project ID and location."
        )
    except PermissionDenied:
        print(
            f"Error: You do not have permission to access PhraseSets in '{parent}'. "
            "Please ensure your account has the necessary roles (e.g., Speech Adaptation Editor)."
        )
    except InvalidArgument as e:
        print(
            f"Error: Invalid argument provided for '{parent}'. "
            f"Please check the format of the project ID and location. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1_adaptation_phraseset_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List PhraseSets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    list_phrase_sets(args.project_id)
