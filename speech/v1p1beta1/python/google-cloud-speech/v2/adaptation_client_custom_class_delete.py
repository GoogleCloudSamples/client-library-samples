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

# [START speech_v1p1beta1_adaptation_customclass_delete]
from google.api_core.exceptions import NotFound
from google.cloud import speech_v1p1beta1 as speech


def delete_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Deletes a custom class from a Google Cloud project.

    The `delete_custom_class` method removes a custom class resource. This operation
    is irreversible and the custom class cannot be recovered after deletion.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to delete.
    """
    client = speech.AdaptationClient()

    # Construct the full resource name of the custom class.
    name = client.custom_class_path(
        project_id, location="global", custom_class=custom_class_id
    )

    try:
        client.delete_custom_class(name=name)
        print(f"Successfully deleted custom class: {name}")
    except NotFound:
        print(f"Custom class {name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting custom class {name}: {e}")


# [END speech_v1p1beta1_adaptation_customclass_delete]

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

    delete_custom_class(args.project_id, args.custom_class_id)
