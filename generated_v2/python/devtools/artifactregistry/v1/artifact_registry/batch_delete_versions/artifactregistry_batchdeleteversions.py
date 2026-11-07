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

# [START artifactregistry_v1_artifactregistry_versions_batchdelete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def batch_delete_versions(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    version_id: str,
) -> None:
    """Use the batch_delete_versions method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The region or location of the repository (for example,
          'us-central1').
        repository_id: The caller-chosen ID of the existing repository.
        package_id: The ID of the existing package holding the versions.
        version_id: The identifier of the version to delete. Server-generated or
          package-defined identifier; read it from an existing resource (for
          example, ListVersions response). Version aliases such as 'latest' are
          explicitly forbidden.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}"
    )
    names = [f"{parent}/versions/{version_id}"]

    request = artifactregistry_v1.BatchDeleteVersionsRequest(
        parent=parent,
        names=names,
    )

    try:
        operation = client.batch_delete_versions(request=request)
        operation.result()
        print(f"Successfully deleted versions from {parent}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END artifactregistry_v1_artifactregistry_versions_batchdelete]
