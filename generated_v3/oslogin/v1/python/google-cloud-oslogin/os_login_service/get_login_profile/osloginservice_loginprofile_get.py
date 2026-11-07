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

# [START oslogin_v1_osloginservice_loginprofile_get]
import google.api_core.exceptions
from google.cloud import oslogin_v1

client = oslogin_v1.OsLoginServiceClient()


def get_login_profile(user_id: str) -> None:
    """Use the get_login_profile method

    Args:
        user_id: ID of the User (for example, 'example-user-id')
    """
    name = f"users/{user_id}"

    try:
        request = oslogin_v1.GetLoginProfileRequest(name=name)
        response = client.get_login_profile(request=request)

        print(f"Profile name: {response.name}")
        for account in response.posix_accounts:
            print(f"Username: {account.username}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve login profile: {error.message}")
# [END oslogin_v1_osloginservice_loginprofile_get]
