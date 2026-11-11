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

# [START gkehub_v1_gkehub_scope_update]
import google.api_core.exceptions
from google.cloud import gkehub_v1
from google.protobuf import field_mask_pb2


def update_scope(project_id: str, location_id: str, scope_id: str) -> None:
    """Updates an existing Fleet Scope.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location for the Scope (typically 'global').
        scope_id: The client-assigned ID of the Scope to update.
    """
    client = gkehub_v1.GkeHubClient()

    scope_name = f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    scope = gkehub_v1.Scope(
        name=scope_name,
        labels={"env": "staging"},
    )

    try:
        operation = client.update_scope(
            scope=scope,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated scope: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update scope: {e}")
# [END gkehub_v1_gkehub_scope_update]
