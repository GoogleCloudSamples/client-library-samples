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

# [START cloudresourcemanager_v3_projects_iampolicy_get]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def get_iam_policy(project_id: str) -> None:
    """Retrieves the IAM policy for a Google Cloud project.

    Args:
        project_id: The unique, user-assigned ID of the Google Cloud project.
    """
    client = resourcemanager_v3.ProjectsClient()
    resource = f"projects/{project_id}"

    try:
        policy = client.get_iam_policy(resource=resource)
        print(f"Retrieved IAM policy for: {resource}")
        for binding in policy.bindings:
            members = ", ".join(binding.members)
            print(f"Role: {binding.role}, Members: {members}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve IAM policy: {error}")
# [END cloudresourcemanager_v3_projects_iampolicy_get]
