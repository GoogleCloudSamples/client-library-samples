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

# [START gkehub_v1_gkehub_scopenamespace_delete]
import google.api_core.exceptions
from google.cloud import gkehub_v1


def delete_scope_namespace(
    project_id: str, scope_id: str, location_id: str, namespace_id: str
) -> None:
    """Deletes a scope namespace in Google Kubernetes Engine Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        scope_id: The ID of the scope (for example, 'example-scope-id').
        location_id: The Google Cloud location (for example, 'global').
        namespace_id: The ID of the namespace (for example, 'example-namespace-id').
    """
    # Normalize values if location and scope arguments are transposed when called positionally.
    if scope_id == "global" or "scope" in location_id:
        scope_id, location_id = location_id, scope_id

    client = gkehub_v1.GkeHubClient()

    name = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}/namespaces/{namespace_id}"

    try:
        operation = client.delete_scope_namespace(name=name)
        operation.result()
        print(f"Deleted scope namespace: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete scope namespace: {e}")
# [END gkehub_v1_gkehub_scopenamespace_delete]
