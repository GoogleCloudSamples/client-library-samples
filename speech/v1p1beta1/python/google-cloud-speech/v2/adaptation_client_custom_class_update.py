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

# [START speech_v1p1beta1_adaptation_customclass_update]
from google.api_core.exceptions import InvalidArgument, NotFound
from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1.types import CustomClass
from google.protobuf.field_mask_pb2 import FieldMask


def update_custom_class_sample(
    project_id: str,
    custom_class_id: str,
    updated_entry_value: str,
) -> None:
    """
    Updates an existing custom class with new items.

    This function demonstrates how to update a specific custom class resource
    by providing its name and the fields to be updated using a field mask.
    It's important to specify which fields are being modified to avoid
    unintended changes to other fields.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to update.
        updated_entry_value: A new value to add to the custom class items.
    """
    client = speech_v1p1beta1.AdaptationClient()

    # Construct the full resource name for the custom class
    custom_class_name = client.custom_class_path(
        project_id, location="global", custom_class=custom_class_id
    )

    # Prepare the updated custom class object.
    # Only fields specified in the update_mask will be applied.
    # For this example, we are updating the 'items' field by adding a new entry.
    # In a real scenario, you might retrieve the existing custom class first
    # to modify its items, or completely replace them.
    updated_class_item = CustomClass.ClassItem(value=updated_entry_value)
    updated_custom_class = CustomClass(
        name=custom_class_name,
        items=[
            updated_class_item
        ],  # This will replace existing items if update_mask includes 'items'
    )

    # Create a field mask to specify that only the 'items' field should be updated.
    # If you wanted to update other fields, you would add them to this mask.
    update_mask = FieldMask(paths=["items"])

    try:
        response = client.update_custom_class(
            custom_class=updated_custom_class, update_mask=update_mask
        )
        print(f"Successfully updated custom class: {response.name}")
        print("Updated items:")
        for item in response.items:
            print(f"- {item.value}")
    except NotFound:
        print(f"Error: Custom class '{custom_class_name}' not found.")
        print("Please ensure the custom class ID and location are correct.")
    except InvalidArgument as e:
        print(f"Error: Invalid argument provided for update: {e}")
        print("Please check the format of the custom class ID or the update mask.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END speech_v1p1beta1_adaptation_customclass_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing custom class in Google Cloud Speech-to-Text."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--custom_class_id",
        type=str,
        required=True,
        help="The ID of the custom class to update. Example: 'my-class-id'",
    )
    parser.add_argument(
        "--updated_entry_value",
        type=str,
        default="new value go here",
        help="A new value to add to the custom class items. Example: 'new-item-value'",
    )

    args = parser.parse_args()

    update_custom_class_sample(
        args.project_id,
        args.custom_class_id,
        args.updated_entry_value,
    )
