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

# [START artifactregistry_v1_artifactregistry_attachment_create]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1


def create_attachment(
    attachment_id: str,
    project_id: str,
    location_id: str,
    repository_id: str,
    file_id: str,
) -> None:
    """Creates an attachment in an Artifact Registry repository.

    Args:
        attachment_id: Caller-chosen identifier for the attachment.
        project_id: Google Cloud project ID.
        location_id: Region or location hosting the repository.
        repository_id: Identifier of the repository.
        file_id: Identifier of the file to associate with the attachment.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    file_name = (
        file_id
        if file_id.startswith("projects/")
        else f"{parent}/files/{file_id}"
    )

    try:
        # Retrieve the file to discover the package or version that owns it.
        file = client.get_file(name=file_name)
        target = file.owner
        if not target:
            for package in client.list_packages(parent=parent):
                target = package.name
                break

        attachment = artifactregistry_v1.Attachment(
            target=target,
            type_="application/vnd.spdx+json",
            files=[file_name],
        )

        operation = client.create_attachment(
            parent=parent,
            attachment_id=attachment_id,
            attachment=attachment,
        )
        response = operation.result()
        print(f"Created attachment: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create attachment: {error.message}")
# [END artifactregistry_v1_artifactregistry_attachment_create]
