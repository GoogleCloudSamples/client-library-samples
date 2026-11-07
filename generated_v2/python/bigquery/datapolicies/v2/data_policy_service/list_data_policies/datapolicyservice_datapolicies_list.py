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

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import bigquery_datapolicies_v1


def list_data_policies(location_id: str) -> None:
    """Lists data policies in a specified project and location.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = bigquery_datapolicies_v1.DataPolicyServiceClient()

    _, default_project = google.auth.default()
    project_number = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("GOOGLE_CLOUD_PROJECT_NUMBER")
        or default_project
        or "example-project-number"
    )
    parent = f"projects/{project_number}/locations/{location_id}"

    request = bigquery_datapolicies_v1.ListDataPoliciesRequest(
        parent=parent,
    )

    try:
        response = client.list_data_policies(request=request)
        for data_policy in response:
            print(f"Data policy name: {data_policy.name}")
            print(f"Policy tag: {data_policy.policy_tag}")
            print(f"Data policy type: {data_policy.data_policy_type}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list data policies: {error}")
# [END bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]
