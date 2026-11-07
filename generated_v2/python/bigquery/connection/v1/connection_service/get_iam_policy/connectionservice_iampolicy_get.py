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

# [START bigqueryconnection_v1_connectionservice_iampolicy_get]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1


def get_iam_policy(project_id: str, location_id: str, connection_id: str) -> None:
    """Retrieves the IAM policy for a BigQuery connection.

    Args:
        project_id: The Google Cloud project ID hosting the BigQuery connection.
        location_id: The location where the connection is located (for example,
          'us' or 'us-central1').
        connection_id: The identifier of the BigQuery connection.
    """
    client = bigquery_connection_v1.ConnectionServiceClient()

    resource = f"projects/{project_id}/locations/{location_id}/connections/{connection_id}"

    try:
        policy = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for: {resource}")
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            members = ", ".join(binding.members)
            print(f"Role: {binding.role}, Members: {members}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END bigqueryconnection_v1_connectionservice_iampolicy_get]
