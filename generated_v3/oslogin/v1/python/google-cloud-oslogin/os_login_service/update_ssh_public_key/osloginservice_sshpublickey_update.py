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

# [START oslogin_v1_osloginservice_sshpublickey_update]
import time

import google.api_core.exceptions
from google.cloud import oslogin_v1
import google.cloud.oslogin_v1.common
from google.protobuf import field_mask_pb2

client = oslogin_v1.OsLoginServiceClient()


def update_ssh_public_key(user_id: str, ssh_public_key_id: str) -> None:
    """Use the update_ssh_public_key method

    Args:
        user_id: The unique user ID (such as a user email address or numeric subject ID).
        ssh_public_key_id: The SHA-256 fingerprint identifying the SSH public key. Server-generated; read from an existing SSH public key or import response.
    """
    name = f"users/{user_id}/sshPublicKeys/{ssh_public_key_id}"
    # Set the expiration time to one hour from the current timestamp in microseconds.
    expiration_time_usec = int((time.time() + 3600) * 1_000_000)
    ssh_public_key = oslogin_v1.common.SshPublicKey(
        expiration_time_usec=expiration_time_usec
    )
    update_mask = field_mask_pb2.FieldMask(paths=["expiration_time_usec"])

    try:
        response = client.update_ssh_public_key(
            name=name,
            ssh_public_key=ssh_public_key,
            update_mask=update_mask,
        )
        print(f"Updated SSH public key fingerprint: {response.fingerprint}")
        print(f"Expiration time (usec): {response.expiration_time_usec}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update SSH public key: {e}")
# [END oslogin_v1_osloginservice_sshpublickey_update]
