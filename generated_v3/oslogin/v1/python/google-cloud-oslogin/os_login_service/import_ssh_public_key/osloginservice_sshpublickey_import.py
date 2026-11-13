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

# [START oslogin_v1_osloginservice_import_ssh_public_key]
import google.api_core.exceptions
from google.cloud import oslogin_v1

client = oslogin_v1.OsLoginServiceClient()


def import_ssh_public_key(user_id: str) -> None:
    """Import an SSH public key for a user into Cloud OS Login.

    Args:
        user_id: ID of the user (for example, 'example-user@example.com').
    """
    parent = f"users/{user_id}"
    ssh_public_key = {
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3examplepublickeyvalue example-user@example.com"
    }

    try:
        response = client.import_ssh_public_key(
            parent=parent,
            ssh_public_key=ssh_public_key,
        )
        print(f"Imported SSH public key for: {response.login_profile.name}")
        print(f"Details: {response.details}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to import SSH public key: {error}")


# [END oslogin_v1_osloginservice_import_ssh_public_key]
