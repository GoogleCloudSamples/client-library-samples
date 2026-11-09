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

# [START dataform_v1beta1_dataform_repository_create]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def create_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the create_repository method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        repository_id: ID of the Repository (for example, 'example-repository-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    repository = dataform_v1beta1.Repository()

    try:
        response = client.create_repository(
            parent=parent,
            repository=repository,
            repository_id=repository_id,
        )
        print(f"Repository created: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Repository '{repository_id}' already exists in '{parent}'.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END dataform_v1beta1_dataform_repository_create]
