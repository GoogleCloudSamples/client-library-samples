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

# [START dataform_v1beta1_dataform_releaseconfig_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def delete_release_config(
    project_id: str,
    location_id: str,
    repository_id: str,
    release_config_id: str,
) -> None:
    """Deletes a Dataform release configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        repository_id: The Dataform repository ID.
        release_config_id: The Dataform release config ID to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/releaseConfigs/{release_config_id}"
    )

    request = dataform_v1beta1.DeleteReleaseConfigRequest(name=name)

    try:
        client.delete_release_config(request=request)
        print(f"Deleted release config: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete release config: {error}")


# [END dataform_v1beta1_dataform_releaseconfig_delete]
