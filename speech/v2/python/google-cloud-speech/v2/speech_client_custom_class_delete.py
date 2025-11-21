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

# [START speech_v2_speech_customclass_delete]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2


def delete_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Deletes a custom class.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to delete.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name for the custom class.
    custom_class_name = client.custom_class_path(
        project=project_id, location="global", custom_class=custom_class_id
    )

    try:
        # Deletes the custom class. The long-running operation returns the
        # CustomClass resource if successful.
        operation = client.delete_custom_class(name=custom_class_name)
        response = operation.result()
        print(f"Successfully deleted custom class: {response.name}")
    except NotFound:
        print(f"Custom class {custom_class_id} not found.")
    except GoogleAPICallError as e:
        print(f"Error deleting custom class {custom_class_id}: {e}")


# [END speech_v2_speech_customclass_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a custom class from Google Cloud Speech-to-Text."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--custom_class_id",
        type=str,
        required=True,
        help="The ID of the custom class to delete.",
    )

    args = parser.parse_args()

    delete_custom_class(
        project_id=args.project_id,
        custom_class_id=args.custom_class_id,
    )
