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

# [START bigqueryconnection_v1_connectionservice_iampolicy_get]
# [START bigqueryconnection_connectionservice_iampolicy_get]

import google.api_core.exceptions
from google.cloud import bigquery_connection_v1

client = bigquery_connection_v1.ConnectionServiceClient()


def get_connection_iam_policy(
    project_id: str,
    location: str,
    connection_id: str,
):
    """Gets the IAM policy of a connection.

    Args:
        project_id: Your Google Cloud project ID.
        location: The geographic location of the connection, e.g., "us".
        connection_id: The ID of the connection.
    """

    resource = client.connection_path(project_id, location, connection_id)

    try:
        policy = client.get_iam_policy(resource=resource)

        print(f"Successfully retrieved IAM policy for connection: {resource}")
        if not policy.bindings:
            print("This policy is empty and has no bindings.")

        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            print("Members:")
            for member in binding.members:
                print(f"    - {member}")

    except google.api_core.exceptions.NotFound:
        print(f"Connection not found: {resource}")


# [END bigqueryconnection_connectionservice_iampolicy_get]
# [END bigqueryconnection_v1_connectionservice_iampolicy_get]
