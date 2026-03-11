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

# [START bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2
from google.iam.v1 import iam_policy_pb2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def test_data_policy_iam_permissions(
    project_id: str,
    location: str,
    data_policy_id: str,
    permissions: list[str],
) -> None:
    """Test IAM permissions for a data policy.
    Tests whether the caller has the specified IAM permissions for a data
    policy resource.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (for example, 'us').
        data_policy_id: The ID of the data policy to test permissions for.
        permissions: A list of permissions to test (for example, ['bigquery.dataPolicies.get']).
    """

    resource_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource_name,
        permissions=permissions,
    )

    try:
        response = client.test_iam_permissions(request=request)

        print(f"Tested permissions for data policy: {resource_name}")
        if response.permissions:
            print(
                f"Caller has the following permissions: {', '.join(response.permissions)}"
            )
        else:
            print("Caller has NONE of the requested permissions.")

    except exceptions.NotFound:
        print(f"Error: Data policy '{resource_name}' not found.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]
