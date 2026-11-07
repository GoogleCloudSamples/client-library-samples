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

# [START analyticshub_v1_analyticshubservice_iampolicy_get]
import google.api_core.exceptions
from google.cloud import bigquery_analyticshub_v1


def get_iam_policy(project_id: str, location_id: str, data_exchange_id: str) -> None:
    """Retrieves the IAM policy for a data exchange resource.

    Args:
        project_id: The Google Cloud project ID hosting the data exchange.
        location_id: The geographic location of the data exchange.
        data_exchange_id: The identifier of the data exchange.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/dataExchanges/{data_exchange_id}"
    )

    request = {"resource": resource}

    try:
        policy = client.get_iam_policy(request=request)
        print(f"Retrieved IAM policy for resource: {resource}")
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            for member in binding.members:
                print(f"  Member: {member}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve IAM policy: {e}")
# [END analyticshub_v1_analyticshubservice_iampolicy_get]
