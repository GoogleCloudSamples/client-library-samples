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

# [START retail_v2beta_get_control]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def get_retail_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """
    Retrieves a specific Control resource from the Retail API.

    The get_control method fetches the details of an existing control based on its
    resource name. Controls are used to configure dynamic metadata that can be
    linked to a ServingConfig and affect search or recommendation results.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to which the control belongs (e.g., "default_catalog").
        control_id: The ID of the control to retrieve (e.g., "my_test_control").
    """
    client = retail_v2beta.ControlServiceClient()

    # Construct the full resource name of the control
    name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    try:
        control = client.get_control(name=name)

        print(f"Control: {control.name}")
        print(f"Display Name: {control.display_name}")
        print(f"Solution Types: {control.solution_types}")

    except exceptions.NotFound:
        print(
            f"Error: Control '{name}' not found. Please ensure the control_id and parent path are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_get_control]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific Control resource from the Retail API."
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
        help="The location of the catalog (e.g., 'global'). Defaults to 'global'.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the control belongs (e.g., 'default_catalog'). Defaults to 'default_catalog'.",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        required=True,
        help="The ID of the control to retrieve (e.g., 'my_test_control').",
    )

    args = parser.parse_args()

    get_retail_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
