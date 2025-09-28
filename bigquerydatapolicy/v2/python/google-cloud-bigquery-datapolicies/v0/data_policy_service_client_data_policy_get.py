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

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_get]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2

def get_data_policy_sample(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """
    Retrieves a specific data policy by its resource name.

    This function demonstrates how to fetch the details of an existing data policy
    using its unique identifier within a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (e.g., "us", "eu").
        data_policy_id: The user-assigned ID of the data policy.
    """
    # Arrange: Create a client
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    # Construct the full resource name for the data policy.
    # The format is projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}
    data_policy_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    # Act: Make the request to get the data policy
    try:
        response = client.get_data_policy(name=data_policy_name)

        # Assert: Handle the response
        print(f"Successfully retrieved data policy: {response.name}")
        print(f"  Data Policy ID: {response.data_policy_id}")
        print(f"  Data Policy Type: {response.data_policy_type.name}")
        if response.policy_tag:
            print(f"  Policy Tag: {response.policy_tag}")
        if response.grantees:
            print(f"  Grantees: {', '.join(response.grantees)}")
        if response.data_masking_policy:
            masking_policy = response.data_masking_policy
            if masking_policy.predefined_expression:
                print(f"  Data Masking Predefined Expression: {masking_policy.predefined_expression.name}")
            elif masking_policy.routine:
                print(f"  Data Masking Routine: {masking_policy.routine}")

    except exceptions.NotFound:
        print(f"Error: Data policy '{data_policy_name}' not found.")
        print("Please ensure the data policy ID, project ID, and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific BigQuery Data Policy."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The geographic location of the data policy (e.g., 'us', 'eu')."
    )
    parser.add_argument(
        "--data_policy_id",
        required=True,
        help="The user-assigned ID of the data policy to retrieve."
    )
    args = parser.parse_args()

    get_data_policy_sample(
        args.project_id,
        args.location,
        args.data_policy_id,
    )
