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

# [START speech_v2_speech_customclass_update]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2


def update_custom_class(
    project_id: str,
    custom_class_id: str,
) -> None:
    """
    Updates a custom class.

    This sample demonstrates how to update an existing CustomClass resource
    by changing its display name and replacing its items.

    Args:
        project_id: The Google Cloud project ID.
        custom_class_id: The ID of the custom class to update.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name for the custom class.
    custom_class_name = client.custom_class_path(
        project=project_id, location="global", custom_class=custom_class_id
    )

    # Define the custom class fields to update.
    # For this example, we update the display name and replace the items list.
    # The 'name' field is required to identify the resource being updated.
    updated_custom_class = speech_v2.CustomClass(
        name=custom_class_name,
        display_name="Updated Custom Class Display Name",
        items=[
            speech_v2.CustomClass.ClassItem(value="new item one"),
            speech_v2.CustomClass.ClassItem(value="new item two"),
        ],
    )

    # Create a field mask to specify which fields to update.
    # Only fields specified in the update_mask will be updated.
    # To replace the entire resource, use update_mask=field_mask_pb2.FieldMask(paths=["*"]).
    # To update specific fields, list them like ["display_name", "items"].
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "items"])

    try:
        # The update_custom_class method returns a long-running operation.
        # We wait for the operation to complete to get the final result.
        operation = client.update_custom_class(
            custom_class=updated_custom_class, update_mask=update_mask
        )
        print("Waiting for operation to complete...")
        response = operation.result()

        print(f"Successfully updated custom class: {response.name}")
        print(f"Display Name: {response.display_name}")
        print("Items:")
        for item in response.items:
            print(f"- {item.value}")
        print(f"State: {response.state.name}")
        print(f"Update Time: {response.update_time.isoformat()}")

    except NotFound:
        print(f"Error: Custom class '{custom_class_name}' not found.")
        print(
            "Please ensure the custom class ID is correct and the custom class exists."
        )
    except GoogleAPICallError as e:
        print(f"Error updating custom class '{custom_class_name}': {e}")
        print(
            "An API call error occurred. Please check the error message and your project configuration."
        )


# [END speech_v2_speech_customclass_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a custom class in Google Cloud Speech-to-Text V2."
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
        help="The ID of the custom class to update.",
    )

    args = parser.parse_args()

    update_custom_class(args.project_id, args.custom_class_id)
