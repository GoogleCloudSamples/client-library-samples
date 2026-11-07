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

# [START gkehub_v1_gkehub_permittedscopes_list]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def list_permitted_scopes(project_id: str, location_id: str) -> None:
    """List permitted scopes in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_permitted_scopes(parent=parent)
        for scope in response:
            print(f"Scope name: {scope.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list permitted scopes: {error}")
# [END gkehub_v1_gkehub_permittedscopes_list]
