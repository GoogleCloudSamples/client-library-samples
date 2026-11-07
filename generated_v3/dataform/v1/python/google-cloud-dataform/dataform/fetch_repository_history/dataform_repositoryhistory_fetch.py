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

# [START dataform_v1_dataform_fetch_repository_history]
import google.api_core.exceptions
from google.cloud import dataform_v1


def fetch_repository_history(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Fetches repository history for a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, for example 'us-central1'.
        repository_id: The ID of the Dataform repository.
    """
    client = dataform_v1.DataformClient()

    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1.FetchRepositoryHistoryRequest(name=name)

    try:
        response = client.fetch_repository_history(request=request)
        commits_found = False
        for commit in response:
            commits_found = True
            print(f"Commit SHA: {commit.commit_sha}")
            print(f"Author: {commit.author.name} <{commit.author.email_address}>")
            print(f"Commit message: {commit.commit_message}")

        if not commits_found:
            print(f"Repository {repository_id} has no commit history.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to fetch repository history: {exc.message}")


# [END dataform_v1_dataform_fetch_repository_history]
