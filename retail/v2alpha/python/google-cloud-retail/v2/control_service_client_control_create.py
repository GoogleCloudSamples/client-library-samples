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

# [START retail_v2alpha_controlservice_create_control]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import retail_v2alpha


def create_retail_control(
    project_id: str, location: str, catalog_id: str, control_id: str
) -> None:
    """
    Creates a new Control in the Retail API.

    A Control configures dynamic metadata that can be linked to a ServingConfig
    and affect search or recommendation results at serving time. This sample
    creates a Control with a Rule that boosts products matching "red" when the
    query is "red shoes".

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to create the control in (e.g., "default_catalog").
        control_id: The ID to use for the Control
    """
    client = retail_v2alpha.ControlServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    # Construct the Control object.
    # This example creates a Control with a Rule that boosts products matching
    # "colorFamilies:red" when the query contains "red shoes".
    control = retail_v2alpha.Control(
        display_name=f"Control {control_id}",
        solution_types=[retail_v2alpha.SolutionType.SOLUTION_TYPE_SEARCH],
        rule=retail_v2alpha.Rule(
            condition=retail_v2alpha.Condition(
                query_terms=[
                    retail_v2alpha.Condition.QueryTerm(
                        value="red shoes", full_match=True
                    )
                ]
            ),
            boost_action=retail_v2alpha.Rule.BoostAction(
                products_filter='colorFamilies: ANY("red")', boost=1.0
            ),
        ),
    )

    try:
        response = client.create_control(
            parent=parent, control=control, control_id=control_id
        )

        print(f"Control created: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Solution Types: {response.solution_types}")
        if response.rule:
            print(f"Rule: {response.rule}")

    except AlreadyExists as e:
        print(
            f"Error: Control '{control_id}' already exists under parent '{parent}'. "
            f"Please try a different control ID or update the existing control. Details: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_controlservice_create_control]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new Retail Control for a given catalog."
    )
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
        help="The ID of the catalog to create the control in (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        help="The ID to use for the Control. This value should be 4-63 characters, and valid characters are /[a-z][0-9]-_/.",
    )

    args = parser.parse_args()

    create_retail_control(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        control_id=args.control_id,
    )
