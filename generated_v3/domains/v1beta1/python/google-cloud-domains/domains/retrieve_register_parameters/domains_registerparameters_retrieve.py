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

# [START domains_v1beta1_domains_retrieve_register_parameters]
import google.api_core.exceptions
from google.cloud import domains_v1beta1


def retrieve_register_parameters(
    project_id: str, location_id: str, location: str
) -> None:
    """Retrieves register parameters for a domain.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
        location: The Google Cloud location (for example, 'global').
    """
    # Use an unregistered domain placeholder with an 'example-' prefix to test available parameters.
    domain_name = "example-available-domain-4f8a9b2c.com"

    client = domains_v1beta1.DomainsClient()

    # Construct the parent location path.
    location_name = location or location_id
    parent = f"projects/{project_id}/locations/{location_name}"

    request = domains_v1beta1.RetrieveRegisterParametersRequest(
        location=parent,
        domain_name=domain_name,
    )

    try:
        response = client.retrieve_register_parameters(request=request)
        print(f"Domain name: {response.register_parameters.domain_name}")
        print(f"Availability: {response.register_parameters.availability.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END domains_v1beta1_domains_retrieve_register_parameters]
