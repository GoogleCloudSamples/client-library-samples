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

# [START domains_v1_domains_retrieve_register_parameters]
import google.api_core.exceptions
from google.cloud import domains_v1

client = domains_v1.DomainsClient()


def retrieve_register_parameters(
    project_id: str, location_id: str, location: str
) -> None:
    """Use the retrieve_register_parameters method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        location: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    domain_name = "example.com"

    location_path = f"projects/{project_id}/locations/{location_id}"

    request = domains_v1.RetrieveRegisterParametersRequest(
        location=location_path,
        domain_name=domain_name,
    )

    try:
        response = client.retrieve_register_parameters(request=request)
        print(f"Domain availability: {response.register_parameters.availability}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve register parameters: {error}")


# [END domains_v1_domains_retrieve_register_parameters]
