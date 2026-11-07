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

# [START gkehub_get_scope]
from google.api_core import exceptions
from google.cloud import gkehub_v1


def get_scope(project_id: str, location_id: str, scope_id: str) -> None:
    """Gets details of a specified GKE Hub scope.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud location (for example, 'global').
        scope_id: Scope ID (for example, 'example-scope-id').
    """
    client = gkehub_v1.GkeHubClient()

    name = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"

    try:
        response = client.get_scope(name=name)
        print(f"Retrieved scope: {response.name}")
        print(f"Scope state: {response.state.code}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve scope: {e}")


# [END gkehub_get_scope]
