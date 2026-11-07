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

# [START artifactregistry_v1beta2_artifactregistry_import_yum_artifacts]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def import_yum_artifacts(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the import_yum_artifacts method

    Args:
        project_id: The Google Cloud project ID where the repository is located.
        location_id: The regional or multi-regional location of the Artifact Registry repository.
        repository_id: The ID of the Artifact Registry Yum repository.
    """
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    gcs_source = artifactregistry_v1beta2.ImportYumArtifactsGcsSource(
        uris=["gs://example-bucket/example-package.rpm"],
        use_wildcards=False,
    )

    request = artifactregistry_v1beta2.ImportYumArtifactsRequest(
        parent=parent,
        gcs_source=gcs_source,
    )

    try:
        operation = client.import_yum_artifacts(request=request)
        print("Waiting for operation to complete...")
        response = operation.result()

        print(f"Imported Yum artifacts: {len(response.yum_artifacts)}")
        for artifact in response.yum_artifacts:
            print(f"Artifact URI: {artifact.uri}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error importing Yum artifacts: {error}")
# [END artifactregistry_v1beta2_artifactregistry_import_yum_artifacts]
