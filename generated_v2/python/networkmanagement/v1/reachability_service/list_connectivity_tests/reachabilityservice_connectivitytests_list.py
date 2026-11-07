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

# [START networkmanagement_v1_reachabilityservice_connectivitytests_list]
import google.api_core.exceptions
from google.cloud import network_management_v1


def list_connectivity_tests(project_id: str) -> None:
    """List connectivity tests in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    client = network_management_v1.ReachabilityServiceClient()

    parent = f"projects/{project_id}/locations/global"

    request = network_management_v1.ListConnectivityTestsRequest(parent=parent)

    try:
        response = client.list_connectivity_tests(request=request)
        for test in response:
            print(f"Test Name: {test.name}")
            print(f"Description: {test.description}")
            print(f"Protocol: {test.protocol}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list connectivity tests: {error}")
    except google.api_core.exceptions.RetryError as error:
        print(f"Request timed out: {error}")
# [END networkmanagement_v1_reachabilityservice_connectivitytests_list]
