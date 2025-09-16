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

# [START retail_v2beta_controlservice_delete_control]
import google.api_core.exceptions
from google.cloud import retail_v2beta


def delete_control(
    project_id: str, location: str, catalog_id: str, control_id: str
) -> None:
    """
    Deletes a Control.

    This method demonstrates how to remove an existing control resource from
    your Retail project. Controls are used to configure dynamic metadata that
    can be linked to a ServingConfig and affect search or recommendation results.
    Deleting a control permanently removes it and it can no longer be used.

    Args:
        project_id: The Google Cloud project ID.
        location: The retail location (e.g., 'global').
        catalog_id: The ID of the catalog.
        control_id: The ID of the control to delete.
    """

    client = retail_v2beta.ControlServiceClient()

    name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    request = retail_v2beta.DeleteControlRequest(name=name)

    try:
        client.delete_control(request=request)
        print(f"Control '{control_id}' deleted successfully.")
    except google.api_core.exceptions.NotFound:
        print(
            f"Control '{control_id}' not found. "
            "It might have been deleted already or never existed."
        )
    except Exception as e:
        print(f"Error deleting control '{control_id}': {e}")


# [END retail_v2beta_controlservice_delete_control]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Retail Control resource.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The retail location (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog. Defaults to 'default_catalog'.",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        required=True,
        help="The ID of the control to delete.",
    )

    args = parser.parse_args()

    delete_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
