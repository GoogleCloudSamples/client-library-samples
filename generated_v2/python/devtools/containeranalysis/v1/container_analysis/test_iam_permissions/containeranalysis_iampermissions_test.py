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

# [START containeranalysis_v1_containeranalysis_test_iam_permissions]
import google.api_core.exceptions
from google.cloud.devtools import containeranalysis_v1


def test_iam_permissions(project_id: str, note_id: str) -> None:
    """Tests IAM permissions on a Container Analysis note.

    Args:
        project_id: The ID of the Google Cloud project that contains the note.
        note_id: The ID of the note to test IAM permissions on.
    """
    client = containeranalysis_v1.ContainerAnalysisClient()
    resource = f"projects/{project_id}/notes/{note_id}"
    permissions = [
        "containeranalysis.notes.getIamPolicy",
        "containeranalysis.notes.setIamPolicy",
    ]

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Granted permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test permissions: {error}")
# [END containeranalysis_v1_containeranalysis_test_iam_permissions]
