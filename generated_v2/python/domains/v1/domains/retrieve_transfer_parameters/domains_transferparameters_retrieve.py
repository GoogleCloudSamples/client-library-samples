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

# [START domains_v1_domains_retrieve_transfer_parameters]
import google.api_core.exceptions
from google.cloud import domains_v1


def retrieve_transfer_parameters(
    project_id: str, location_id: str, location: str
) -> None:
    """Retrieves transfer parameters for a domain.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region identifier (for example, 'global').
        location: The Google Cloud region where the service is located (for
          example, 'global').
    """
    domain_name = "example-domain.com"

    client = domains_v1.DomainsClient()

    # Construct the parent location resource path
    location_name = location or location_id
    location_path = f"projects/{project_id}/locations/{location_name}"

    request = domains_v1.RetrieveTransferParametersRequest(
        location=location_path,
        domain_name=domain_name,
    )

    try:
        response = client.retrieve_transfer_parameters(request=request)
        print(f"Domain name: {response.domain_name}")
        print(f"Current registrar: {response.current_registrar}")
        print(f"Transfer lock state: {response.transfer_lock_state}")
    except google.api_core.exceptions.BadRequest as error:
        print(f"Domain transfer notice: {error.message}")
# [END domains_v1_domains_retrieve_transfer_parameters]
