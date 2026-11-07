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

# [START dataform_v1_dataform_iampolicy_get]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def get_iam_policy(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the get_iam_policy method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform repository (for example, 'us-central1').
        repository_id: The ID of the Dataform repository. Caller-chosen when the repository was created.
    """
    resource = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    try:
        policy = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for {resource}:")
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            print(f"Members: {list(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve IAM policy: {error.message}")
# [END dataform_v1_dataform_iampolicy_get]
