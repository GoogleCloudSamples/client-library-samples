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

# [START privateca_v1_certificateauthorityservice_capool_create]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def create_ca_pool(project_id: str, location_id: str, ca_pool_id: str) -> None:
    """Creates a Certificate Authority (CA) pool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
        ca_pool_id: The identifier for the CA pool.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    ca_pool = privateca_v1.CaPool(
        tier=privateca_v1.CaPool.Tier.ENTERPRISE,
    )

    try:
        operation = client.create_ca_pool(
            parent=parent,
            ca_pool=ca_pool,
            ca_pool_id=ca_pool_id,
        )
        response = operation.result()
        print(f"Created CA pool: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create CA pool: {error}")
# [END privateca_v1_certificateauthorityservice_capool_create]
