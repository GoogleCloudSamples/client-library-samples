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

# [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2
from google.iam.v1 import iam_policy_pb2, policy_pb2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def set_data_policy_iam_policy(
    project_id: str,
    location: str,
    data_policy_id: str,
    member: str,
    role: str,
) -> None:
    """Set the IAM policy for a data policy.
    Sets the IAM policy for a specified data policy resource from the BigQuery
    Data Policy API. This is useful for granting specific roles to members on
    the policy.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (for example, 'us').
        data_policy_id: The ID of the data policy.
        member: The IAM principal to be added (for example, 'user:example@gmail.com').
        role: The IAM role to grant (for example, 'roles/bigquery.dataPolicyUser').
    """

    resource_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    # First, get the current policy to preserve it (standard ETag management).
    get_request = iam_policy_pb2.GetIamPolicyRequest(resource=resource_name)
    try:
        current_policy = client.get_iam_policy(request=get_request)
    except exceptions.NotFound:
        print(f"Error: Data policy '{resource_name}' not found.")
        return

    # Add a new binding for the specified role and member.
    new_binding = policy_pb2.Binding(role=role, members=[member])
    current_policy.bindings.append(new_binding)

    set_request = iam_policy_pb2.SetIamPolicyRequest(
        resource=resource_name,
        policy=current_policy,
    )

    try:
        updated_policy = client.set_iam_policy(request=set_request)

        print(f"Successfully updated IAM policy for data policy: {resource_name}")
        print(f"New Binding added: {role} for {member}")
        print(f"Updated ETag: {updated_policy.etag}")

    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]
