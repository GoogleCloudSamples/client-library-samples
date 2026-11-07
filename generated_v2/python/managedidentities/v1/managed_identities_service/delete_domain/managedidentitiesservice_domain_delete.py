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

# [START managedidentities_v1_managedidentitiesservice_domain_delete]
import google.api_core.exceptions
from google.cloud import managedidentities_v1


def delete_domain(project_id: str) -> None:
    """Deletes an existing domain in Managed Service for Microsoft Active Directory.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = managedidentities_v1.ManagedIdentitiesServiceClient()

    domain_name = "example.com"
    name = f"projects/{project_id}/locations/global/domains/{domain_name}"

    request = managedidentities_v1.DeleteDomainRequest(
        name=name,
    )

    try:
        operation = client.delete_domain(request=request)
        operation.result()
        print(f"Deleted domain: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error deleting domain: {e}")
# [END managedidentities_v1_managedidentitiesservice_domain_delete]
