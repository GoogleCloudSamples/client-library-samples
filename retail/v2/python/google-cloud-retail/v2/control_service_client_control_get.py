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

# [START retail_v2_controlservice_control_get]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2


def get_retail_control(
    project_id: str, location: str, catalog_id: str, control_id: str
) -> None:
    """
    Gets a specific Control resource from Google Cloud Retail.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog.
        control_id: The ID of the control to retrieve.
    """

    client = retail_v2.ControlServiceClient()

    name = client.control_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        control=control_id,
    )

    try:
        control = client.get_control(name=name)

        print(f"Display Name: {control.display_name}")
        print(f"Solution Types:")
        for solution in control.solution_types:
            print(f"  {solution.name}")
        if control.rule:
            print(f"Rule Control: {control.rule}")
        elif control.facet_spec:
            print(f"Control Facet Spec: {control.facet_spec}")
        else:
            print(f"Control Type: Unknown")

    except NotFound as e:
        print(
            f"The control '{name}' was not found. Please ensure the project ID, "
            f"location, catalog ID, and control ID are correct. Error: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_controlservice_control_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a specific Control resource from Google Cloud Retail."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="Your Google Cloud project ID."
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
        help="The ID of the catalog. Defaults to 'default_catalog'.",
    )
    parser.add_argument(
        "--control_id",
        required=True,
        type=str,
        help="The ID of the control to retrieve",
    )

    args = parser.parse_args()

    get_retail_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
