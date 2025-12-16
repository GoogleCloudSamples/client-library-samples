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

# [START speech_v2_speech_recognizer_delete]
from google.api_core.exceptions import GoogleAPIError, NotFound
from google.cloud import speech_v2


def delete_recognizer(
    project_id: str,
    recognizer_id: str,
) -> None:
    """Deletes a Speech-to-Text Recognizer.

    This function demonstrates how to delete a Speech-to-Text Recognizer
    resource. It handles the case where the recognizer might not be found
    and other general API errors.

    Args:
        project_id: The Google Cloud project ID.
        recognizer_id: The ID of the Recognizer to delete.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name of the recognizer.
    recognizer_name = client.recognizer_path(
        project_id, location="global", recognizer=recognizer_id
    )

    try:
        # Delete the recognizer. This is a long-running operation.
        # The operation.result() call will block until the operation is complete.
        operation = client.delete_recognizer(name=recognizer_name)
        response = operation.result()

        print(f"Successfully deleted recognizer: {response.name}")
        print(f"Recognizer state: {response.state.name}")
    except NotFound:
        print(
            f"Recognizer {recognizer_name} not found. "
            "It may have already been deleted or never existed. "
            "No action needed."
        )
    except GoogleAPIError as e:
        print(
            f"A Google API error occurred while deleting recognizer {recognizer_name}: {e}"
        )
        print(
            "Please check the project ID and recognizer ID, and ensure you have the necessary permissions."
        )
    except Exception as e:
        print(
            f"An unexpected error occurred while deleting recognizer {recognizer_name}: {e}"
        )
        print(
            "Please review the error message and consult the documentation for troubleshooting."
        )


# [END speech_v2_speech_recognizer_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Speech-to-Text Recognizer.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--recognizer_id",
        type=str,
        required=True,
        help="The ID of the Recognizer to delete.",
    )

    args = parser.parse_args()

    delete_recognizer(args.project_id, args.recognizer_id)
