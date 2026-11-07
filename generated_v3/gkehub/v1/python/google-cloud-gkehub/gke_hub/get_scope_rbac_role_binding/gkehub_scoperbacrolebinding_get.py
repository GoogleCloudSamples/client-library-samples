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

# [START gkehub_v1_gkehub_scoperbacrolebinding_get]
from google.api_core import exceptions
from google.cloud import gkehub_v1


def get_scope_rbac_role_binding(
    project_id: str, location_id: str, scope_id: str, rbacrolebinding_id: str
) -> None:
    """Gets a Scope RBAC Role Binding in GKE Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        scope_id: The Scope ID (for example, 'example-scope-id').
        rbacrolebinding_id: The RBAC Role Binding ID (for example, 'example-rbacrolebinding-id').
    """
    client = gkehub_v1.GkeHubClient()

    name = client.rbac_role_binding_path(
        project_id, location_id, scope_id, rbacrolebinding_id
    )

    request = gkehub_v1.GetScopeRBACRoleBindingRequest(
        name=name,
    )

    try:
        response = client.get_scope_rbac_role_binding(request=request)
        print(f"Retrieved Scope RBAC Role Binding: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve Scope RBAC Role Binding: {e}")


# [END gkehub_v1_gkehub_scoperbacrolebinding_get]
