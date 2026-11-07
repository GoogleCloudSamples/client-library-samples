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

# [START oslogin_v1_osloginservice_sshpublickey_get]
import google.api_core.exceptions
from google.cloud import oslogin_v1

client = oslogin_v1.OsLoginServiceClient()


def get_ssh_public_key(user_id: str, fingerprint_id: str) -> None:
    """Use the get_ssh_public_key method

    Args:
        user_id: The unique ID (such as an email address) of the user.
        fingerprint_id: The SHA-256 fingerprint identifying the SSH public key.
    """
    name = f"users/{user_id}/sshPublicKeys/{fingerprint_id}"

    request = oslogin_v1.GetSshPublicKeyRequest(
        name=name,
    )

    try:
        response = client.get_ssh_public_key(request=request)
        print(f"Retrieved SSH public key: {response.key}")
        print(f"Fingerprint: {response.fingerprint}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve SSH public key: {e}")
# [END oslogin_v1_osloginservice_sshpublickey_get]
