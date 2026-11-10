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

# [START networkmanagement_v1_reachabilityservice_connectivitytest_get]
import google.api_core.exceptions
from google.cloud import network_management_v1


def get_connectivity_test(project_id: str, test_id: str) -> None:
    """Retrieves an existing connectivity test configuration and result.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        test_id: The ID of the test (for example, 'example-test-id').
    """
    client = network_management_v1.ReachabilityServiceClient()

    name = f"projects/{project_id}/locations/global/connectivityTests/{test_id}"

    request = network_management_v1.GetConnectivityTestRequest(
        name=name,
    )

    try:
        response = client.get_connectivity_test(request=request)
        print(f"Retrieved connectivity test: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve connectivity test: {e}")
# [END networkmanagement_v1_reachabilityservice_connectivitytest_get]
