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

# [START gkehub_v1_gkehub_scope_create]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def create_scope(project_id: str, location_id: str, scope_id: str) -> None:
    """Creates a Fleet scope in GKE Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'global')
        scope_id: ID of the Scope (for example, 'example-scope-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    scope = gkehub_v1.Scope()

    try:
        operation = client.create_scope(
            parent=parent,
            scope_id=scope_id,
            scope=scope,
        )
        response = operation.result()
        print(f"Scope created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gkehub_v1_gkehub_scope_create]
