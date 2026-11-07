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

# [START artifactregistry_v1_artifactregistry_file_update]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1
from google.protobuf import field_mask_pb2


def update_file(
    project_id: str, location_id: str, repository_id: str, file_id: str
) -> None:
    """Updates metadata annotations on a file in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The regional or multi-regional location of the repository (for example, 'us-central1').
        repository_id: The ID of the Artifact Registry repository.
        file_id: The ID of the file. If the file ID contains slashes, URL-escape them (for example, 'a%2Fb%2Fc.txt').
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    file_name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}/files/{file_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["annotations"])
    file = artifactregistry_v1.File(
        name=file_name,
        annotations={"updated_by": "example-user"},
    )

    try:
        response = client.update_file(file=file, update_mask=update_mask)
        print(f"Updated file: {response.name}")
        print(f"File annotations: {response.annotations}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update file: {e}")
# [END artifactregistry_v1_artifactregistry_file_update]
