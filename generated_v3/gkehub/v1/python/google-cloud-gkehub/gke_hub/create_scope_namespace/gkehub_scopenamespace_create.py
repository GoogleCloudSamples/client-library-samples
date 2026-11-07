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

# [START gkehub_v1_gkehub_scopenamespace_create]
import google.api_core.exceptions
from google.cloud import gkehub_v1


def create_scope_namespace(
    project_id: str, location_id: str, scope_id: str, scope_namespace_id: str
) -> None:
    """Creates a GKE Hub scope namespace.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region (for example, 'global').
        scope_id: Identifier of the scope (for example, 'example-scope-id').
        scope_namespace_id: Identifier of the scope namespace (for example, 'example-namespace-id').
    """
    client = gkehub_v1.GkeHubClient()

    parent = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"
    scope_namespace = gkehub_v1.Namespace(scope=parent)

    try:
        operation = client.create_scope_namespace(
            parent=parent,
            scope_namespace=scope_namespace,
            scope_namespace_id=scope_namespace_id,
        )
        response = operation.result()
        print(f"Created scope namespace: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create scope namespace: {exc}")


# [END gkehub_v1_gkehub_scopenamespace_create]
