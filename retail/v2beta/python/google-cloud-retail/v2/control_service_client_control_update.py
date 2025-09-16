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

# [START retail_v2beta_controlservice_control_update]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2beta
from google.cloud.retail_v2beta import types
from google.protobuf import field_mask_pb2


def update_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """
    Updates a Control in the Retail catalog.

    The update_control method allows you to modify an existing control's properties.
    This sample demonstrates updating the display name of a control.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog.
        control_id: The ID of the control to update.
    """
    # Instantiate the client. This client is created with a `with` statement to
    # ensure that the client's resources are properly released when the
    # block is exited, even if errors occur.
    with retail_v2beta.ControlServiceClient() as client:
        # Prepare the API request.
        control_name = client.control_path(
            project=project_id,
            location=location,
            catalog=catalog_id,
            control=control_id,
        )

        # Define the new display name for the control.
        new_display_name = "Updated Control Display Name Python"

        # Create a Control object with the updated field(s) and the control's name.
        # Only fields specified in the update_mask will be updated.
        control_to_update = types.Control(
            name=control_name,
            display_name=new_display_name,
        )

        # Create a FieldMask to specify which fields of the Control are being updated.
        # In this case, we are only updating the 'display_name'.
        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        request = types.UpdateControlRequest(
            control=control_to_update,
            update_mask=update_mask,
        )

        print(f"Updating control: {control_name}")
        print(f"New display name: {new_display_name}")

        # Execute the API call.
        try:
            updated_control = client.update_control(request=request)

            # Verify the result by printing the output to standard output.
            print("Control updated successfully:")
            print(f"Control Name: {updated_control.name}")
            print(f"Updated Display Name: {updated_control.display_name}")
            print(f"Solution Types: {updated_control.solution_types}")

        except NotFound as e:
            # Handle NOT_FOUND errors, which occur if the control does not exist.
            print(
                f"Error: The control '{control_name}' was not found. Please ensure the control_id is correct and the control exists."
            )
            print(f"Details: {e}")
        except GoogleAPICallError as e:
            # Handle other Google API-specific errors.
            print(f"An API error occurred while updating control '{control_name}': {e}")
            print(
                "Please check the error details for more information, such as invalid arguments or permissions issues."
            )
        except Exception as e:
            # Catch any other unexpected errors.
            print(f"An unexpected error occurred: {e}")
            print(
                "This might be due to network issues, client configuration problems, or other unforeseen circumstances."
            )


# [END retail_v2beta_controlservice_control_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Google Cloud Retail Control."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the catalog (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog.",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        required=True,
        help="The ID of the control to update.",
    )

    args = parser.parse_args()

    update_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
