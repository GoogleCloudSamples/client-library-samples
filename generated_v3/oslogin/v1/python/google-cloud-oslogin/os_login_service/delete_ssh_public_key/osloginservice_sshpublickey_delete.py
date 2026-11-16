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

# [START oslogin_v1_osloginservice_sshpublickey_delete]
import google.api_core.exceptions
from google.cloud import oslogin_v1

client = oslogin_v1.OsLoginServiceClient()


def delete_ssh_public_key(user_id: str, fingerprint_id: str) -> None:
    """Deletes an SSH public key from an OS Login profile.

    Args:
        user_id: ID of the User (for example, 'example-user-id')
        fingerprint_id: ID of the Fingerprint (for example, 'example-fingerprint-id')
    """
    name = f"users/{user_id}/sshPublicKeys/{fingerprint_id}"

    request = oslogin_v1.DeleteSshPublicKeyRequest(
        name=name,
    )

    try:
        client.delete_ssh_public_key(request=request)
        print(f"Deleted SSH public key: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END oslogin_v1_osloginservice_sshpublickey_delete]
