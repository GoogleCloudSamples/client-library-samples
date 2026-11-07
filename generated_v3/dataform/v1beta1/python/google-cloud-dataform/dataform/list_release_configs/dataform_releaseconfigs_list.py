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

# [START dataform_v1beta1_dataform_releaseconfigs_list]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def list_release_configs(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists release configurations for a Dataform repository.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region where the repository resides (for example, 'us-central1').
        repository_id: ID of the Dataform repository (for example, 'example-repository').
    """
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1beta1.ListReleaseConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_release_configs(request=request)
        for release_config in response:
            print(f"Name: {release_config.name}")
            print(f"Git commitish: {release_config.git_commitish}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list release configs: {error}")
# [END dataform_v1beta1_dataform_releaseconfigs_list]
