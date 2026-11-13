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

# [START privateca_v1_certificateauthorityservice_capool_get]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def get_ca_pool(project_id: str, location_id: str, ca_pool_id: str) -> None:
    """Retrieves a CA pool in a given project and location.

    Args:
        project_id: The Google Cloud project ID hosting the CaPool.
        location_id: The Google Cloud region where the CaPool is located.
        ca_pool_id: The ID of an existing CaPool.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}"

    try:
        response = client.get_ca_pool(name=name)
        print(f"CA Pool retrieved: {response.name}")
        print(f"Tier: {response.tier.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")
# [END privateca_v1_certificateauthorityservice_capool_get]
