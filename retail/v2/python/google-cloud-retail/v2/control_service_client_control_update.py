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

# [START retail_v2_controlservice_update_control]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_retail_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """
    Updates a Control in the Retail API.

    This method demonstrates how to update an existing control's display name
    and search solution use case. The control must already exist.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        control_id: The ID of the control to update.
    """
    client = retail_v2.ControlServiceClient()

    control_name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    # Construct the updated Control object.
    # Only fields specified in the update_mask will be updated.
    # The 'name' field is immutable and must match the control being updated.
    # 'solution_types' is also immutable and should not be changed.
    updated_control = retail_v2.Control(
        name=control_name,
        display_name="Updated Control Name",
    )

    # Specify which fields to update using a FieldMask.
    # Paths should correspond to the field names in the Control proto.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = retail_v2.UpdateControlRequest(
        control=updated_control,
        update_mask=update_mask,
    )

    try:
        response = client.update_control(request=request)
        print(f"Control updated: {response.name}")
        print(f"New Display Name: {response.display_name}")
    except NotFound as e:
        print(
            f"Control '{control_name}' not found. Please ensure the control_id is correct and the control exists. Error: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_controlservice_update_control]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Control in the Retail API.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
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
        "--control_id", required=True, type=str, help="The ID of the control to update."
    )

    args = parser.parse_args()

    update_retail_control(
        args.project_id, args.location, args.catalog_id, args.control_id
    )
