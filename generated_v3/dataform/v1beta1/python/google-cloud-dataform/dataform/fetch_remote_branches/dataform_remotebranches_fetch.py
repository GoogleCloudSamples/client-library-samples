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

# [START dataform_v1beta1_dataform_fetch_remote_branches]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def fetch_remote_branches(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Fetches the list of remote Git branches for a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform repository.
        repository_id: The Dataform repository identifier.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}"
    )

    request = dataform_v1beta1.FetchRemoteBranchesRequest(name=name)

    try:
        response = client.fetch_remote_branches(request=request)
        print(f"Fetched remote branches for {name}:")
        for branch in response.branches:
            print(branch)
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error fetching remote branches: {error}")


# [END dataform_v1beta1_dataform_fetch_remote_branches]
