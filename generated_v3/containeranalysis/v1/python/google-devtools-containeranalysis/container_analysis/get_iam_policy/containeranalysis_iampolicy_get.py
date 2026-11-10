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

# [START containeranalysis_v1_containeranalysis_iampolicy_get]
import google.api_core.exceptions
from google.cloud.devtools import containeranalysis_v1


def get_iam_policy(project_id: str, note_id: str) -> None:
    """Gets the IAM policy for a Container Analysis note.

    Args:
        project_id: The Google Cloud project ID.
        note_id: The identifier of the Container Analysis note.
    """
    client = containeranalysis_v1.ContainerAnalysisClient()
    resource = f"projects/{project_id}/notes/{note_id}"

    try:
        policy = client.get_iam_policy(resource=resource)
        print(f"Policy retrieved for {resource}.")
        for binding in policy.bindings:
            print(f"Role: {binding.role}, Members: {binding.members}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get IAM policy: {error}")
# [END containeranalysis_v1_containeranalysis_iampolicy_get]
