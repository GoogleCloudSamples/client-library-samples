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

# [START cloudkms_v1_keymanagementservice_generate_random_bytes]
from google.api_core import exceptions
from google.cloud import kms_v1


def generate_random_bytes(
    project_id: str, location_id: str, length_bytes: int
) -> None:
    """Generate random bytes using Cloud KMS HSM.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        length_bytes: The length in bytes of the randomness to retrieve.
    """
    client = kms_v1.KeyManagementServiceClient()

    location = f"projects/{project_id}/locations/{location_id}"
    protection_level = kms_v1.ProtectionLevel.HSM

    request = kms_v1.GenerateRandomBytesRequest(
        location=location,
        length_bytes=int(length_bytes),
        protection_level=protection_level,
    )

    try:
        response = client.generate_random_bytes(request=request)
        print(f"Generated {len(response.data)} random bytes.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to generate random bytes: {error}")


# [END cloudkms_v1_keymanagementservice_generate_random_bytes]
