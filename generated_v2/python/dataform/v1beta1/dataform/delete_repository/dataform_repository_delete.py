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

# [START dataform_v1beta1_dataform_repository_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def delete_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Delete a Dataform repository.

    Args:
        project_id: The Google Cloud project ID hosting the Dataform repository.
        location_id: The Google Cloud region where the Dataform repository is located.
        repository_id: The ID of the Dataform repository to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1beta1.DeleteRepositoryRequest(name=name)

    try:
        client.delete_repository(request=request)
        print(f"Deleted repository: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Repository not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete repository: {error}")
# [END dataform_v1beta1_dataform_repository_delete]
