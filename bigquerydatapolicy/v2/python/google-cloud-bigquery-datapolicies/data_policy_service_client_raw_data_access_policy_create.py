# Copyright 2026 Google LLC
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

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create_raw_data_access]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def create_raw_data_access_policy(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """Create a raw data access policy.
    Creates a data policy with type RAW_DATA_ACCESS_POLICY. This policy type
    is used to grant raw data access to specific principals for columns that
    are otherwise protected by security policies.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (for example, 'us').
        data_policy_id: The user-assigned ID for the data policy.
    """

    parent = f"projects/{project_id}/locations/{location}"

    # Create the DataPolicy object.
    # We set the type to RAW_DATA_ACCESS_POLICY.
    data_policy = bigquery_datapolicies_v2.DataPolicy(
        data_policy_type=bigquery_datapolicies_v2.DataPolicy.DataPolicyType.RAW_DATA_ACCESS_POLICY,
    )

    request = bigquery_datapolicies_v2.CreateDataPolicyRequest(
        parent=parent,
        data_policy_id=data_policy_id,
        data_policy=data_policy,
    )

    try:
        response = client.create_data_policy(request=request)
        print(f"Successfully created raw data access policy: {response.name}")
        print(f"Data Policy ID: {response.data_policy_id}")
        print(f"Data Policy Type: {response.data_policy_type.name}")

    except exceptions.AlreadyExists:
        print(f"Error: Data policy '{data_policy_id}' already exists.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create_raw_data_access]
