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

# [START dataform_v1beta1_dataform_repository_get]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def get_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the get_repository method to retrieve a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository resides (for example, 'us-central1').
        repository_id: The ID of the Dataform repository.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1beta1.GetRepositoryRequest(name=name)

    try:
        response = client.get_repository(request=request)
        print(f"Repository retrieved: {response.name}")
        if response.git_remote_settings:
            print(f"Git remote URL: {response.git_remote_settings.url}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve repository: {error}")
# [END dataform_v1beta1_dataform_repository_get]
