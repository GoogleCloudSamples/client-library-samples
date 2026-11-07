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

# [START dataform_v1_dataform_repository_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def delete_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the delete_repository method

    Args:
        project_id: The Google Cloud project ID containing the Dataform repository.
        location_id: The Google Cloud region where the Dataform repository is located.
        repository_id: The ID of the Dataform repository to delete. Caller-chosen when the repository was created.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    try:
        client.delete_repository(name=name)
        print(f"Deleted repository: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error deleting repository: {error}")
# [END dataform_v1_dataform_repository_delete]
