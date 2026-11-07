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

# [START managedidentities_v1_managedidentitiesservice_reset_admin_password]
import google.api_core.exceptions
from google.cloud import managedidentities_v1


def reset_admin_password(project_id: str) -> None:
    """Resets the administrator password for a Managed Microsoft AD domain.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = managedidentities_v1.ManagedIdentitiesServiceClient()

    domain_name = "example.com"
    name = f"projects/{project_id}/locations/global/domains/{domain_name}"

    request = managedidentities_v1.ResetAdminPasswordRequest(
        name=name,
    )

    try:
        response = client.reset_admin_password(request=request)
        print(f"Reset administrator password successfully: {response.password}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to reset administrator password: {e}")
# [END managedidentities_v1_managedidentitiesservice_reset_admin_password]
