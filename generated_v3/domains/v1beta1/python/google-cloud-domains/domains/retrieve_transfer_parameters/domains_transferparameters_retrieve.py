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

# [START domains_v1beta1_domains_retrieve_transfer_parameters]
import google.api_core.exceptions
from google.cloud import domains_v1beta1


def retrieve_transfer_parameters(
    project_id: str, location_id: str, location: str
) -> None:
    """Retrieve transfer parameters for a domain.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        location: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = domains_v1beta1.DomainsClient()

    domain_name = "example.com"
    location_path = f"projects/{project_id}/locations/{location_id}"

    request = domains_v1beta1.RetrieveTransferParametersRequest(
        domain_name=domain_name,
        location=location_path,
    )

    try:
        response = client.retrieve_transfer_parameters(request=request)
        print(f"Domain name: {response.transfer_parameters.domain_name}")
        print(
            f"Current registrar: {response.transfer_parameters.current_registrar}"
        )
    except google.api_core.exceptions.BadRequest as e:
        print(f"Service returned expected deprecation response: {e.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Service returned an error: {e.message}")


# [END domains_v1beta1_domains_retrieve_transfer_parameters]
