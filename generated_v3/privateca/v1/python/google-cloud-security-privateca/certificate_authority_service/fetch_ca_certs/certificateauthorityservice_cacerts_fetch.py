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

# [START privateca_v1_certificateauthorityservice_fetch_ca_certs]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def fetch_ca_certs(project_id: str, ca_pool_id: str, location_id: str) -> None:
    """Fetches CA certificates from a CA pool.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        ca_pool_id: ID of the CA pool (for example, 'example-capool-id').
        location_id: Google Cloud region where the CA pool is located (for example, 'us-central1').
    """
    client = privateca_v1.CertificateAuthorityServiceClient()
    ca_pool = client.ca_pool_path(project_id, location_id, ca_pool_id)
    request = privateca_v1.FetchCaCertsRequest(ca_pool=ca_pool)

    try:
        response = client.fetch_ca_certs(request=request)
        print(f"Fetched CA certificates for pool: {ca_pool}")
        for ca_cert in response.ca_certs:
            for cert in ca_cert.certificates:
                print(cert)
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END privateca_v1_certificateauthorityservice_fetch_ca_certs]
