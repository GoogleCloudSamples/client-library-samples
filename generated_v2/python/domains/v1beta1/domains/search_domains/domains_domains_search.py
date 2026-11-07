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

# [START domains_v1beta1_domains_domains_search]
from google.api_core import exceptions
from google.cloud import domains_v1beta1


def search_domains(project_id: str, location_id: str, location: str) -> None:
    """Searches for available domain names.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region identifier (for example, 'global').
        location: The Google Cloud location where the service is located (for example, 'global').
    """
    client = domains_v1beta1.DomainsClient()

    query = "example-domain-search.com"
    location_path = f"projects/{project_id}/locations/{location}"

    request = domains_v1beta1.SearchDomainsRequest(
        location=location_path,
        query=query,
    )

    try:
        response = client.search_domains(request=request)
        for register_parameter in response.register_parameters:
            print(f"Domain name: {register_parameter.domain_name}")
            print(f"Availability: {register_parameter.availability.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END domains_v1beta1_domains_domains_search]
