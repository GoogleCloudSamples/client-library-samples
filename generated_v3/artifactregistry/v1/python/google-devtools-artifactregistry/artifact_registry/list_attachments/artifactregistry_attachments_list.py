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

# [START artifactregistry_v1_artifactregistry_attachments_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1


def list_attachments(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists attachments in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the repository,
            for example, 'us-central1'.
        repository_id: The Artifact Registry repository ID.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = artifactregistry_v1.ListAttachmentsRequest(
        parent=parent,
    )

    try:
        response = client.list_attachments(request=request)
        found = False
        for attachment in response:
            found = True
            print(f"Attachment name: {attachment.name}")
            print(f"Target: {attachment.target}")
            print(f"Type: {attachment.type_}")

        if not found:
            print(f"No attachments found in repository: {repository_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list attachments: {error}")
# [END artifactregistry_v1_artifactregistry_attachments_list]
