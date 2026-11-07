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

# [START gkehub_v1_gkehub_scopenamespace_get]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def get_scope_namespace(
    project_id: str, location_id: str, scope_id: str, namespace_id: str
) -> None:
    """Use the get_scope_namespace method to retrieve a Fleet Namespace.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for GKE Hub resources (typically 'global').
        scope_id: The client-chosen ID of the Fleet Scope (for example, 'example-scope-id').
        namespace_id: The client-chosen ID of the Fleet Namespace (RFC 1123 compliant DNS label, for example, 'example-namespace-id').
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"
        f"/namespaces/{namespace_id}"
    )

    request = gkehub_v1.GetScopeNamespaceRequest(
        name=name,
    )

    try:
        response = client.get_scope_namespace(request=request)
        print(f"Retrieved scope namespace: {response.name}")
        print(f"Namespace state: {response.state.code.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Scope namespace not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END gkehub_v1_gkehub_scopenamespace_get]
