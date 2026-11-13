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

# [START oslogin_v1_osloginservice_posixaccount_delete]
import google.api_core.exceptions
from google.cloud import oslogin_v1

client = oslogin_v1.OsLoginServiceClient()


def delete_posix_account(user_id: str, project_id: str) -> None:
    """Use the delete_posix_account method

    Args:
        user_id: ID of the User (for example, 'example-user-id')
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    name = client.posix_account_path(user_id, project_id)

    try:
        client.delete_posix_account(name=name)
        print(f"Deleted POSIX account: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete POSIX account: {e}")


# [END oslogin_v1_osloginservice_posixaccount_delete]
