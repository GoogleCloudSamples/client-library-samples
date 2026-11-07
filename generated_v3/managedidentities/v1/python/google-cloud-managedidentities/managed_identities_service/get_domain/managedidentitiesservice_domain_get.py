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

# [START managedidentities_v1_managedidentitiesservice_domain_get]
import google.api_core.exceptions
from google.cloud import managedidentities_v1

client = managedidentities_v1.ManagedIdentitiesServiceClient()


def get_domain(project_id: str, location_id: str, domain_id: str) -> None:
    """Retrieves details of a Managed Microsoft AD domain.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The location ID for the domain. Must be set to 'global'.
        domain_id: The domain identifier (for example, 'example-domain.com').
    """
    name = f"projects/{project_id}/locations/{location_id}/domains/{domain_id}"

    request = managedidentities_v1.GetDomainRequest(name=name)

    try:
        response = client.get_domain(request=request)
        print(f"Retrieved domain: {response.name}")
        print(f"Domain state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END managedidentities_v1_managedidentitiesservice_domain_get]
