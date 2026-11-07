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

# [START gkehub_v1_gkehub_scopenamespaces_list]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def list_scope_namespaces(project_id: str, location_id: str, scope_id: str) -> None:
    """Lists namespaces associated with a fleet scope.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the scope (for example, 'global').
        scope_id: The client-chosen ID of the Scope (for example, 'example-scope-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"

    try:
        response = client.list_scope_namespaces(parent=parent)
        for scope_namespace in response:
            print(f"Scope namespace: {scope_namespace.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gkehub_v1_gkehub_scopenamespaces_list]
