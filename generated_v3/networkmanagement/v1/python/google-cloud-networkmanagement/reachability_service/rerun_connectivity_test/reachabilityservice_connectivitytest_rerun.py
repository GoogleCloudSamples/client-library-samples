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

# [START networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
import google.api_core.exceptions
from google.cloud import network_management_v1


def rerun_connectivity_test(project_id: str, test_id: str) -> None:
    """Reruns an existing connectivity test.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        test_id: The ID of the connectivity test (for example, 'example-test-id').
    """
    client = network_management_v1.ReachabilityServiceClient()

    name = f"projects/{project_id}/locations/global/connectivityTests/{test_id}"

    request = network_management_v1.RerunConnectivityTestRequest(
        name=name,
    )

    try:
        operation = client.rerun_connectivity_test(request=request)
        response = operation.result()
        print(f"Connectivity test rerun completed: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to rerun connectivity test: {error}")


# [END networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
