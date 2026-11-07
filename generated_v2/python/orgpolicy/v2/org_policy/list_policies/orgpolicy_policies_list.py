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

# [START orgpolicy_v2_orgpolicy_policies_list]
from google.api_core import exceptions
from google.cloud import orgpolicy_v2


def list_policies(project_id: str) -> None:
    """Lists organization policies for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    client = orgpolicy_v2.OrgPolicyClient()
    request = orgpolicy_v2.ListPoliciesRequest(parent=parent)

    try:
        policies = client.list_policies(request=request)

        count = 0
        for policy in policies:
            print(f"Policy: {policy.name}")
            count += 1

        if count == 0:
            print(f"No organization policies found for {parent}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list policies: {error}")
# [END orgpolicy_v2_orgpolicy_policies_list]
