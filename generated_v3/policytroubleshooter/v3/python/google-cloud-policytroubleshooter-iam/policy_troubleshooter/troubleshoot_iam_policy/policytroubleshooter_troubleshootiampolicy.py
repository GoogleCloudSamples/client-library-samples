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

# [START policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]
import google.api_core.exceptions
from google.cloud import policytroubleshooter_iam_v3


def troubleshoot_iam_policy(
    principal: str, full_resource_name: str, permission: str
) -> None:
    """Troubleshoots IAM access for a principal on a specific Google Cloud resource.

    Args:
        principal: The email address of the principal to check (for example,
          service-account@example-project-id.iam.gserviceaccount.com).
        full_resource_name: The full resource name identifying the Google Cloud
          resource (for example,
          //cloudresourcemanager.googleapis.com/projects/example-project-id).
        permission: The IAM permission to check (for example,
          resourcemanager.projects.get).
    """
    client = policytroubleshooter_iam_v3.PolicyTroubleshooterClient()

    access_tuple = policytroubleshooter_iam_v3.AccessTuple(
        principal=principal,
        full_resource_name=full_resource_name,
        permission=permission,
    )
    request = policytroubleshooter_iam_v3.TroubleshootIamPolicyRequest(
        access_tuple=access_tuple,
    )

    try:
        response = client.troubleshoot_iam_policy(request=request)
        print(f"Overall access state: {response.overall_access_state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to troubleshoot IAM policy: {e}")
# [END policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]
