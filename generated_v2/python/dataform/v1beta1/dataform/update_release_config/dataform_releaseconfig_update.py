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

# [START dataform_v1beta1_dataform_releaseconfig_update]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1
from google.protobuf import field_mask_pb2


def update_release_config(
    project_id: str,
    location_id: str,
    repository_id: str,
    release_config_id: str,
) -> None:
    """Updates a Dataform release configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is located.
        repository_id: The ID of the Dataform repository.
        release_config_id: The ID of the Dataform release configuration to update.
    """
    client = dataform_v1beta1.DataformClient()

    release_config_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/releaseConfigs/{release_config_id}"
    )

    # Disable the release configuration to demonstrate a safe update.
    # The API requires git_commitish to be populated on the ReleaseConfig object.
    release_config = dataform_v1beta1.ReleaseConfig(
        name=release_config_name,
        git_commitish="main",
        disabled=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["disabled"])

    try:
        response = client.update_release_config(
            release_config=release_config,
            update_mask=update_mask,
        )
        print(f"Updated release configuration: {response.name}")
        print(f"Disabled status: {response.disabled}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END dataform_v1beta1_dataform_releaseconfig_update]
