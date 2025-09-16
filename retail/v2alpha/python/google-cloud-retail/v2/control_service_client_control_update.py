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

# [START retail_v2alpha_update_control]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_retail_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
    new_display_name: str,
) -> None:
    """
    Updates a Control in the Retail API. This sample demonstrates how to update
    the display name of an existing control.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        control_id: The ID of the control to update.
        new_display_name: The new display name for the control.
    """
    client = retail_v2alpha.ControlServiceClient()

    control_name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    try:
        existing_control = client.get_control(name=control_name)

        # Update the desired fields of the control.
        existing_control.display_name = new_display_name

        # Create a field mask to specify which fields are being updated.
        # This is crucial for partial updates and prevents unintended data loss.
        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        request = retail_v2alpha.UpdateControlRequest(
            control=existing_control,
            update_mask=update_mask,
        )

        updated_control = client.update_control(request=request)

        print(f"Control updated successfully: {updated_control.name}")
        print(f"New Display Name: {updated_control.display_name}")
        print(f"Solution Types: {updated_control.solution_types}")

    except NotFound as e:
        print(
            f"Error: Control '{control_name}' not found. Please ensure the control exists. {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_update_control]

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
        help="The ID of the catalog (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        required=True,
        help="The ID of the control to update.",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        default="Updated Test Control Display Name",
        help="The new display name for the control.",
    )

    args = parser.parse_args()

    update_retail_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
        new_display_name=args.new_display_name,
    )
