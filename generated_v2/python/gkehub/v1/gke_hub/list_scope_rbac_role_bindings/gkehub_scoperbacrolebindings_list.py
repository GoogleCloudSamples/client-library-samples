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

# [START gkehub_v1_gkehub_scoperbacrolebindings_list]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def list_scope_rbac_role_bindings(
    project_id: str, location_id: str, scope_id: str
) -> None:
    """Use the list_scope_rbac_role_bindings method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the Scope resource (for example, 'global').
        scope_id: The client-chosen ID of the existing Fleet Scope (for example, 'example-scope-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"

    request = gkehub_v1.ListScopeRBACRoleBindingsRequest(parent=parent)

    try:
        response = client.list_scope_rbac_role_bindings(request=request)
        for role_binding in response:
            print(f"Role binding name: {role_binding.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list scope RBAC role bindings: {error}")


# [END gkehub_v1_gkehub_scoperbacrolebindings_list]
