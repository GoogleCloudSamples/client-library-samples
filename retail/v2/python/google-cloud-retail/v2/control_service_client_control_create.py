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

# [START retail_v2_controlservice_control_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import retail_v2 as retail


def create_control(
    project_id: str,
    location: str,
    catalog_id: str,
    control_id: str,
) -> None:
    """Creates a Control in the Retail API.

    A control configures dynamic metadata that can be linked to a ServingConfig
    and affect search or recommendation results at serving time. This sample
    demonstrates creating a simple 'Rule' type control that boosts products
    based on a query term and a filter.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to create the control in
                    (e.g., "default_catalog").
        control_id: The ID to use for the Control.
    """
    client = retail.ControlServiceClient()

    parent = client.catalog_path(project_id, location, catalog_id)

    # Create a simple rule for the control.
    # This example creates a rule that boosts products within the blue color family
    # when the query term is "google" with a full match.
    query_term = retail.Condition.QueryTerm(value="google", full_match=True)
    condition = retail.Condition(query_terms=[query_term])

    boost_action = retail.Rule.BoostAction(
        boost=0.5, products_filter='colorFamilies: ANY("blue")'
    )
    rule = retail.Rule(condition=condition, boost_action=boost_action)

    control = retail.Control(
        display_name=f"Test Control for {control_id}",
        solution_types=[retail.SolutionType.SOLUTION_TYPE_SEARCH],
        rule=rule,
    )

    request = retail.CreateControlRequest(
        parent=parent,
        control=control,
        control_id=control_id,
    )

    try:
        response = client.create_control(request=request)
        print(f"Control created successfully: {response.name}")

    except AlreadyExists as e:
        print(
            f"Control '{control_id}' already exists for catalog '{catalog_id}'. "
            f"Please use a unique control ID or update the existing control. Error: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred while creating the control: {e}")


# [END retail_v2_controlservice_control_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a Control in the Retail API.")
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
        help="The ID of the catalog to create the control in (e.g., 'default_catalog').",
    )
    parser.add_argument(
        "--control_id",
        type=str,
        required=True,
        help="The ID to use for the Control. Must be unique within the catalog.",
    )

    args = parser.parse_args()

    create_control(
        args.project_id,
        args.location,
        args.catalog_id,
        args.control_id,
    )
