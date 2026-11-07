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

# [START dataform_v1beta1_dataform_fetch_repository_history]
from google.api_core import exceptions
from google.cloud import dataform_v1beta1


def fetch_repository_history(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Fetches the commit history of a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
        repository_id: The ID of the Dataform repository without a configured Git remote URL.
    """
    client = dataform_v1beta1.DataformClient()

    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1beta1.FetchRepositoryHistoryRequest(name=name)

    try:
        response = client.fetch_repository_history(request=request)
        print(f"Fetched repository history for {name}:")
        has_commits = False
        for commit in response:
            has_commits = True
            print(f"Commit SHA: {commit.commit_sha}")
            print(f"Author: {commit.author.name} <{commit.author.email_address}>")
            print(f"Message: {commit.commit_message}")
        if not has_commits:
            print("No commits found.")
    except exceptions.GoogleAPICallError as err:
        print(f"Error fetching repository history: {err}")


# [END dataform_v1beta1_dataform_fetch_repository_history]
