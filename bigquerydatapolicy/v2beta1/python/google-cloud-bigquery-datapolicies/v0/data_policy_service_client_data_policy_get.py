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

# [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]
from google.cloud import bigquery_datapolicies_v2beta1
from google.api_core import exceptions

def get_data_policy_sample(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """
    Retrieves a data policy by its resource name.

    This function demonstrates how to fetch the details of an existing data policy
    in BigQuery Data Policies using its project ID, location, and data policy ID.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (e.g., "us").
        data_policy_id: The ID of the data policy to retrieve.
    """
    client = bigquery_datapolicies_v2beta1.DataPolicyServiceClient()

    # The full resource name of the data policy.
    # Format: projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}
    name = client.data_policy_path(project_id, location, data_policy_id)

    try:
        response = client.get_data_policy(name=name)
        print(f"Successfully retrieved data policy: {response.name}")
        print(f"  Data Policy ID: {response.data_policy_id}")
        print(f"  Data Policy Type: {response.data_policy_type.name}")
        if response.data_masking_policy:
            print(f"  Data Masking Policy: {response.data_masking_policy.predefined_expression.name}")
        if response.grantees:
            print(f"  Grantees: {', '.join(response.grantees)}")

    except exceptions.NotFound:
        print(f"Error: Data policy '{name}' not found.")
        print("Please ensure the project ID, location, and data policy ID are correct and the policy exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a BigQuery Data Policy by its resource name."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="your-project-id", # Replace with your Google Cloud project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us", # Replace with the location of your data policy, e.g., 'us', 'eu'
        help="The geographic location of the data policy.",
    )
    parser.add_argument(
        "--data_policy_id",
        type=str,
        default="my-data-policy-id", # Replace with the ID of your data policy
        help="The ID of the data policy to retrieve.",
    )

    args = parser.parse_args()

    get_data_policy_sample(args.project_id, args.location, args.data_policy_id)
