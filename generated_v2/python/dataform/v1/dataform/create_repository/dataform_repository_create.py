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

# [START dataform_v1_dataform_repository_create]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def create_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the create_repository method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        repository_id: ID of the Repository (for example, 'example-repository-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    repository = dataform_v1.Repository()

    request = dataform_v1.CreateRepositoryRequest(
        parent=parent,
        repository_id=repository_id,
        repository=repository,
    )

    try:
        response = client.create_repository(request=request)
        print(f"Created repository: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataform_v1_dataform_repository_create]
