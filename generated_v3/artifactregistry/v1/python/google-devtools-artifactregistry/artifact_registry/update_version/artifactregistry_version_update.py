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

# [START artifactregistry_v1_artifactregistry_version_update]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1
from google.protobuf import field_mask_pb2


def update_version(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    version_id: str,
) -> None:
    """Updates annotations for an Artifact Registry package version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the repository is located (for
            example, "us-central1").
        repository_id: The Artifact Registry repository ID.
        package_id: The package ID within the repository.
        version_id: The version ID or digest within the package.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    version_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}/versions/{version_id}"
    )

    version = artifactregistry_v1.Version(
        name=version_name,
        annotations={"release": "candidate"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["annotations"])

    try:
        response = client.update_version(
            version=version,
            update_mask=update_mask,
        )
        print(f"Updated version: {response.name}")
        print(f"Annotations: {response.annotations}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update version: {error}")
# [END artifactregistry_v1_artifactregistry_version_update]
