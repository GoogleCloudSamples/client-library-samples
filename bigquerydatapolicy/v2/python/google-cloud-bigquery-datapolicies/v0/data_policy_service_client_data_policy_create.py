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

# [START bigquery_datapolicies_v2_datapolicyservice_create_data_policy]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def create_data_policy(project_id: str, location: str, data_policy_id: str) -> None:
    """
    Creates a new data policy with a SHA-256 data masking rule.

    Args:
        project_id (str): The Google Cloud project ID.
        location (str): The geographic location of the data policy (e.g., "us-central1").
        data_policy_id (str): The ID for the new data policy.
    """

    parent = f"projects/{project_id}/locations/{location}"

    # Define the data masking policy.
    # Here, we specify a SHA-256 predefined expression for data masking.
    data_masking_policy = bigquery_datapolicies_v2.DataMaskingPolicy(
        predefined_expression=bigquery_datapolicies_v2.DataMaskingPolicy.PredefinedExpression.SHA256
    )

    # Create the DataPolicy object.
    # We set the type to DATA_MASKING_POLICY and assign the defined masking policy.
    data_policy = bigquery_datapolicies_v2.DataPolicy(
        data_policy_type=bigquery_datapolicies_v2.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
        data_masking_policy=data_masking_policy,
    )

    request = bigquery_datapolicies_v2.CreateDataPolicyRequest(
        parent=parent,
        data_policy_id=data_policy_id,
        data_policy=data_policy,
    )

    try:
        response = client.create_data_policy(request=request)
        print(f"Successfully created data policy: {response.name}")
        print(f"Data Policy ID: {response.data_policy_id}")
        print(f"Data Policy Type: {response.data_policy_type.name}")
        print(
            "Data Masking Predefined Expression:"
            f" {response.data_masking_policy.predefined_expression.name}"
        )
    except exceptions.AlreadyExists as e:
        print(
            f"Error: Data policy '{data_policy_id}' already exists in project"
            f" '{project_id}' in location '{location}'. Use a unique ID or"
            " update the existing policy if needed."
        )

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project '{project_id}' or location '{location}'"
            " was not found or is inaccessible. Make sure the project ID and"
            " location are correct and you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquery_datapolicies_v2_datapolicyservice_create_data_policy]
