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

# [START publicca_v1_publiccertificateauthorityservice_externalaccountkey_create]
import google.api_core.exceptions
from google.cloud.security import publicca_v1


def create_external_account_key(project_id: str, location_id: str) -> None:
    """Creates a new ExternalAccountKey bound to the specified project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (must be 'global').
    """
    client = publicca_v1.PublicCertificateAuthorityServiceClient()

    # Create an empty ExternalAccountKey instance; key data is server-generated.
    external_account_key = publicca_v1.ExternalAccountKey()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.create_external_account_key(
            parent=parent,
            external_account_key=external_account_key,
        )
        print(f"Created external account key: {response.name}")
        print(f"Key ID: {response.key_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create external account key: {e}")
# [END publicca_v1_publiccertificateauthorityservice_externalaccountkey_create]
