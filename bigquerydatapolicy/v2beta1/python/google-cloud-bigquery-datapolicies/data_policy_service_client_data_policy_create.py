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

# [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2beta1
from google.cloud.bigquery_datapolicies_v2beta1.types import datapolicy

client = bigquery_datapolicies_v2beta1.DataPolicyServiceClient()


def create_data_policy(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """Creates a data policy in the BigQuery Data Policy API that applies a predefined data masking rule to a specified data column.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (for example, "us").
        data_policy_id: The ID of the data policy to create.
    """

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

    request = datapolicy.CreateDataPolicyRequest(
        parent=parent,
        data_policy_id=data_policy_id,
        data_policy=data_policy,
    )

    try:
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


# [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
