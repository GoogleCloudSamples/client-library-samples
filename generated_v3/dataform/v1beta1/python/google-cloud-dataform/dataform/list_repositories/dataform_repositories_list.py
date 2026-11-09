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

# [START dataform_v1beta1_dataform_repositories_list]
from google.api_core import exceptions
from google.cloud import dataform_v1beta1


def list_repositories(project_id: str, location_id: str) -> None:
    """List Dataform repositories in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = dataform_v1beta1.DataformClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = dataform_v1beta1.ListRepositoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_repositories(request=request)
        for repository in response:
            print(f"Repository name: {repository.name}")
    except exceptions.GoogleAPICallError as err:
        print(f"Request failed: {err}")
# [END dataform_v1beta1_dataform_repositories_list]
