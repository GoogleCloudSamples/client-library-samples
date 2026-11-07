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

# [START oslogin_v1_osloginservice_sshpublickey_create]
import google.api_core.exceptions
from google.cloud import oslogin_v1
from google.cloud.oslogin_v1 import common

client = oslogin_v1.OsLoginServiceClient()


def create_ssh_public_key(user_id: str) -> None:
    """Creates an SSH public key for a Google Cloud user account.

    Args:
        user_id: ID of the user (for example, 'example-user-id').
    """
    parent = f"users/{user_id}"
    ssh_public_key = common.SshPublicKey(
        key=(
            "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0examplepublickey "
            "example-user@example.com"
        )
    )

    try:
        response = client.create_ssh_public_key(
            parent=parent,
            ssh_public_key=ssh_public_key,
        )
        print(f"Created SSH public key with fingerprint: {response.fingerprint}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create SSH public key: {e}")
# [END oslogin_v1_osloginservice_sshpublickey_create]
