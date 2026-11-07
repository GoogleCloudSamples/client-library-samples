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

# [START artifactregistry_v1_artifactregistry_projectsettings_update]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1
from google.protobuf import field_mask_pb2


def update_project_settings(project_id: str) -> None:
    """Updates Artifact Registry project settings for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    project_settings = artifactregistry_v1.ProjectSettings(
        name=f"projects/{project_id}/projectSettings",
        legacy_redirection_state=artifactregistry_v1.ProjectSettings.RedirectionState.REDIRECTION_FROM_GCR_IO_DISABLED,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["legacy_redirection_state"])

    try:
        response = client.update_project_settings(
            project_settings=project_settings,
            update_mask=update_mask,
        )
        print(f"Updated project settings resource: {response.name}")
        print(
            f"Legacy redirection state: {response.legacy_redirection_state.name}"
        )
    except google.api_core.exceptions.BadRequest as error:
        print(f"Project settings update notification: {error.message}")
# [END artifactregistry_v1_artifactregistry_projectsettings_update]
