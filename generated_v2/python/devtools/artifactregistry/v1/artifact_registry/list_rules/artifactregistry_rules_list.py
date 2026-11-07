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

# [START artifactregistry_v1_artifactregistry_rules_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_rules(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists rules for an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository.
        repository_id: The ID of the repository whose rules will be listed.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = artifactregistry_v1.ListRulesRequest(
        parent=parent,
    )

    try:
        response = client.list_rules(request=request)
        for rule in response:
            print(f"Rule name: {rule.name}")
            print(f"Rule action: {rule.action}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error occurred: {error}")
# [END artifactregistry_v1_artifactregistry_rules_list]
