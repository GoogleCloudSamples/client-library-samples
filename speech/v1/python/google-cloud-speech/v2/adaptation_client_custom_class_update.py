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

# [START speech_v1_adaptation_customclass_update]
import sys

from google.api_core.exceptions import NotFound
from google.cloud import speech_v1
from google.protobuf.field_mask_pb2 import FieldMask


def update_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Updates a custom class with new items.

    This sample demonstrates how to update an existing custom class by changing
    its associated items. It assumes the custom class already exists.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to update.
                         This ID will be part of the custom class's resource name.
    """
    client = speech_v1.AdaptationClient()

    custom_class_name = client.custom_class_path(
        project_id, location="global", custom_class=custom_class_id
    )

    custom_class_to_update = speech_v1.CustomClass(
        name=custom_class_name,
        items=[
            speech_v1.CustomClass.ClassItem(value="new item one"),
            speech_v1.CustomClass.ClassItem(value="new item two"),
        ],
    )

    # If update_mask is not specified, all mutable fields in `custom_class_to_update`
    # will be updated, potentially overwriting other fields with their default values.
    update_mask = FieldMask(paths=["items"])

    try:
        updated_custom_class = client.update_custom_class(
            custom_class=custom_class_to_update,
            update_mask=update_mask,
        )

        print(f"Successfully updated custom class: {updated_custom_class.name}")
        print(f"Updated items: {[item.value for item in updated_custom_class.items]}")

    except NotFound:
        print(
            f"Error: Custom class '{custom_class_name}' not found. "
            "Please ensure the custom class exists before attempting to update it.",
            file=sys.stderr,
        )
        print(
            "You can create a custom class using the `create_custom_class` method.",
            file=sys.stderr,
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)
        print(
            "Please check your project ID, location, and custom class ID.",
            file=sys.stderr,
        )


# [END speech_v1_adaptation_customclass_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a custom class in Google Cloud Speech-to-Text."
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
        help="The ID of the custom class to update. ",
    )

    args = parser.parse_args()

    update_custom_class(
        project_id=args.project_id, custom_class_id=args.custom_class_id
    )
