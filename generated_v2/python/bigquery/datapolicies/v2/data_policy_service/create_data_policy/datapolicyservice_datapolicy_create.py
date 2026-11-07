# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
import google.api_core.exceptions
from google.cloud import bigquery_datapolicies_v2


def create_data_policy(
    location_id: str, data_policy_id: str, project_id: str
) -> None:
    """Creates a data policy in BigQuery Data Policy Service.

    Args:
        location_id: The Google Cloud region for the data policy (for example,
          'us-central1').
        data_policy_id: User-assigned identifier for the data policy.
        project_id: The Google Cloud project ID.
    """
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    data_policy = bigquery_datapolicies_v2.DataPolicy(
        data_policy_type=bigquery_datapolicies_v2.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
        data_masking_policy=bigquery_datapolicies_v2.DataMaskingPolicy(
            predefined_expression=bigquery_datapolicies_v2.DataMaskingPolicy.PredefinedExpression.SHA256
        ),
    )

    try:
        response = client.create_data_policy(
            parent=parent,
            data_policy=data_policy,
            data_policy_id=data_policy_id,
        )
        print(f"Created data policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create data policy: {exc}")


# [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_create]
