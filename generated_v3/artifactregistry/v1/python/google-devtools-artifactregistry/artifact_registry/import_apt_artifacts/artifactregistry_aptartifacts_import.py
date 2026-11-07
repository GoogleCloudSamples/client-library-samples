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

# [START artifactregistry_v1_artifactregistry_import_apt_artifacts]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def import_apt_artifacts(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the import_apt_artifacts method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the repository is located.
        repository_id: The ID of the target Apt repository.
    """
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    gcs_source = artifactregistry_v1.ImportAptArtifactsGcsSource(
        uris=["gs://example-bucket/path/to/package.deb"],
        use_wildcards=False,
    )

    request = artifactregistry_v1.ImportAptArtifactsRequest(
        parent=parent,
        gcs_source=gcs_source,
    )

    try:
        operation = client.import_apt_artifacts(request=request)
        print("Waiting for operation to complete...")
        response = operation.result()

        for artifact in response.apt_artifacts:
            print(f"Imported APT artifact: {artifact.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed with error: {e}")
# [END artifactregistry_v1_artifactregistry_import_apt_artifacts]
