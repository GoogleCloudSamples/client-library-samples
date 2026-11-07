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

# [START cloudshell_v1_cloudshellservice_environment_get]
from google.api_core import exceptions
from google.cloud import shell_v1


def get_environment() -> None:
    """Retrieves a Cloud Shell environment."""
    name = "users/me/environments/default"

    client = shell_v1.CloudShellServiceClient()

    try:
        request = shell_v1.GetEnvironmentRequest(name=name)
        response = client.get_environment(request=request)
        print(f"Environment name: {response.name}")
        print(f"Environment state: {response.state}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END cloudshell_v1_cloudshellservice_environment_get]
