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

# [START retail_v2alpha_controlservice_control_delete]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def delete_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """
    Deletes a Control from a Google Cloud Retail catalog.

    This sample demonstrates how to delete an existing control. Controls are
    dynamic metadata that can be linked to serving configurations to affect
    search or recommendation results.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'global').
        catalog_id: The ID of the catalog where the control is located.
        control_id: The ID of the control to delete.
    """
    client = retail_v2alpha.ControlServiceClient()

    name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    request = retail_v2alpha.DeleteControlRequest(name=name)

    try:
        client.delete_control(request=request)
        print(f"Control {name} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Control {name} not found. It might have been deleted already or "
            "never existed. Please check the control ID and try again."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting control {name}: {e}")


# [END retail_v2alpha_controlservice_control_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Control from a Google Cloud Retail catalog."
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
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog where the control is located.",
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
