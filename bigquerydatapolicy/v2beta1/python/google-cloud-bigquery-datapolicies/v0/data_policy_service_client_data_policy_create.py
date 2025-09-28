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

from google.api_core import exceptions

# [START bigquerydatapolicy_v2beta1_datapolicyservice_create_data_policy]
from google.cloud import bigquery_datapolicies_v2beta1
from google.cloud.bigquery_datapolicies_v2beta1.types import datapolicy

def create_data_policy_sample(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """
    Creates a new data policy under a project with the given ID and data policy type.

    This sample demonstrates how to create a data masking policy that applies
    a default masking value to data.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (e.g., "us").
        data_policy_id: The user-assigned ID of the data policy to create.
                        This ID must be unique within the project and location.
    """
    client = bigquery_datapolicies_v2beta1.DataPolicyServiceClient()

    # The parent resource name for the data policy.
    # Format: projects/{project_number}/locations/{location_id}
    parent = f"projects/{project_id}/locations/{location}"

    # Define the data masking policy to apply.
    # Here, we use a predefined expression to replace data with its default masking value.
    data_masking_policy = datapolicy.DataMaskingPolicy(
        predefined_expression=datapolicy.DataMaskingPolicy.PredefinedExpression.DEFAULT_MASKING_VALUE
    )

    # Define the data policy itself.
    # Set its type to DATA_MASKING_POLICY and link the data_masking_policy.
    data_policy = datapolicy.DataPolicy(
        data_policy_type=datapolicy.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
        data_masking_policy=data_masking_policy,
    )

    # Construct the request to create the data policy.
    request = datapolicy.CreateDataPolicyRequest(
        parent=parent,
        data_policy_id=data_policy_id,
        data_policy=data_policy,
    )

    try:
        # Make the API call to create the data policy.
        response = client.create_data_policy(request=request)

        print(f"Successfully created data policy: {response.name}")
        print(f"Data Policy ID: {response.data_policy_id}")
        print(f"Data Policy Type: {response.data_policy_type.name}")
        if response.data_masking_policy:
            print(
                f"Data Masking Policy Predefined Expression: "
                f"{response.data_masking_policy.predefined_expression.name}"
            )

    except exceptions.AlreadyExists as e:
        print(f"Error: Data policy '{data_policy_id}' already exists in {parent}.")
        print(f"Details: {e}")
    except exceptions.NotFound as e:
        print(f"Error: The specified project or location was not found: {parent}.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2beta1_datapolicyservice_create_data_policy]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new BigQuery data policy."
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
        required=True,
        help="The geographic location of the data policy (e.g., 'us').",
    )
    parser.add_argument(
        "--data_policy_id",
        type=str,
        required=True,
        help="The user-assigned ID of the data policy to create.",
    )

    args = parser.parse_args()

    create_data_policy_sample(args.project_id, args.location, args.data_policy_id)
