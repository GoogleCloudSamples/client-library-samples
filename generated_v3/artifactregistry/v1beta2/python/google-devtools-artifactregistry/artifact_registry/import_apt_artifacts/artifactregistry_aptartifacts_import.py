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

# [START artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def import_apt_artifacts(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Imports Apt artifacts from Cloud Storage into an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID hosting the target Artifact
          Registry repository.
        location_id: The regional or multi-regional location of the Artifact
          Registry repository (for example, 'us-central1').
        repository_id: The identifier of the Artifact Registry repository to
          import Apt artifacts into.
    """
    gcs_source = artifactregistry_v1beta2.ImportAptArtifactsGcsSource(
        uris=["gs://example-bucket/path/to/package.deb"],
        use_wildcards=False,
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}"
    )
    request = artifactregistry_v1beta2.ImportAptArtifactsRequest(
        parent=parent,
        gcs_source=gcs_source,
    )

    try:
        operation = client.import_apt_artifacts(request=request)
        print("Waiting for the import operation to complete...")
        response = operation.result()
        print(f"Operation completed. Imported {len(response.apt_artifacts)} artifacts.")
        for artifact in response.apt_artifacts:
            print(f"Imported artifact: {artifact.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to import Apt artifacts: {error}")
# [END artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
