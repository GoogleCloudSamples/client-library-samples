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

# [START gkehub_v1_gkehub_scoperbacrolebinding_update]
import google.api_core.exceptions
from google.cloud import gkehub_v1
from google.protobuf import field_mask_pb2

client = gkehub_v1.GkeHubClient()


def update_scope_rbac_role_binding(
    project_id: str, location_id: str, scope_id: str, rbacrolebinding_id: str
) -> None:
    """Updates a Scope RBAC role binding.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location.
        scope_id: The client-assigned ID of the Scope.
        rbacrolebinding_id: The client-assigned ID of the RBACRoleBinding.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    rbacrolebinding = gkehub_v1.RBACRoleBinding(
        name=(
            f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}/"
            f"rbacrolebindings/{rbacrolebinding_id}"
        ),
        labels={"env": "production"},
    )

    try:
        operation = client.update_scope_rbac_role_binding(
            rbacrolebinding=rbacrolebinding,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated scope RBAC role binding: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gkehub_v1_gkehub_scoperbacrolebinding_update]
