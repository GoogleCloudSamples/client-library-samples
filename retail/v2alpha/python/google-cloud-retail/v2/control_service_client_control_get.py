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

# [START retail_v2alpha_controlservice_get_control]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2alpha


def get_retail_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """
    Retrieves a specific control from the Retail API.

    This method demonstrates how to fetch the details of an existing control
    using its full resource name.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
        control_id: The ID of the control to retrieve.
    """
    client = retail_v2alpha.ControlServiceClient()

    name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    try:
        request = retail_v2alpha.GetControlRequest(name=name)
        control = client.get_control(request=request)

        print(f"Successfully retrieved control: {control.display_name}")
        print(f"Control Name: {control.name}")
        print(f"Solution Types: {control.solution_types}")
        if control.rule:
            print(f"Control Rule: {control.rule}")
        elif control.facet_spec:
            print(f"Control Facet Spec: {control.facet_spec}")

    except NotFound:
        print(
            f"Error: Control '{name}' not found. Please ensure the control_id is correct."
        )
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2alpha_controlservice_get_control]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific control from the Retail API."
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
        help="The ID of the control to retrieve.",
    )

    args = parser.parse_args()

    get_retail_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
