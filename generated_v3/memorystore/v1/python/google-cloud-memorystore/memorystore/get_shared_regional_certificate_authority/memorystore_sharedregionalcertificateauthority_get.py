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

# [START memorystore_v1_memorystore_sharedregionalcertificateauthority_get]
import google.api_core.exceptions
from google.cloud import memorystore_v1

client = memorystore_v1.MemorystoreClient()


def get_shared_regional_certificate_authority(
    project_id: str, location_id: str
) -> None:
    """Gets the shared regional certificate authority for a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    name = client.shared_regional_certificate_authority_path(
        project_id, location_id
    )

    request = memorystore_v1.GetSharedRegionalCertificateAuthorityRequest(
        name=name,
    )

    try:
        response = client.get_shared_regional_certificate_authority(
            request=request
        )
        print(f"Certificate authority retrieved: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed with error: {e}")


# [END memorystore_v1_memorystore_sharedregionalcertificateauthority_get]
