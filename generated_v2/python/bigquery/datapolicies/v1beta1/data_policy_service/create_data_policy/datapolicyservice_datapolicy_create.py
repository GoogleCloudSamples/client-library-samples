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

# [START bigquerydatapolicy_v1beta1_datapolicyservice_datapolicy_create]
import google.api_core.exceptions
from google.cloud import bigquery_datapolicies_v1beta1


def create_data_policy(
    location_id: str, data_policy_id: str, project_id: str
) -> None:
    """Creates a column-level security data policy.

    Args:
        location_id: The Google Cloud region or multi-region where the data
          policy is located (for example, 'us-central1' or 'us').
        data_policy_id: Unique identifier for the data policy within the project.
        project_id: The Google Cloud project ID where the data policy is created.
    """
    client = bigquery_datapolicies_v1beta1.DataPolicyServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    data_policy = bigquery_datapolicies_v1beta1.DataPolicy(
        data_policy_id=data_policy_id,
        data_policy_type=bigquery_datapolicies_v1beta1.DataPolicy.DataPolicyType.COLUMN_LEVEL_SECURITY_POLICY,
        policy_tag=f"projects/{project_id}/locations/{location_id}/taxonomies/example-taxonomy-id/policyTags/example-policy-tag-id",
    )

    try:
        response = client.create_data_policy(
            parent=parent,
            data_policy=data_policy,
        )
        print(f"Created data policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create data policy: {e}")
# [END bigquerydatapolicy_v1beta1_datapolicyservice_datapolicy_create]
