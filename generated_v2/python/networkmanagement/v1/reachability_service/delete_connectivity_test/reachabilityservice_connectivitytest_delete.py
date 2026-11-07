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

# [START networkmanagement_v1_reachabilityservice_connectivitytest_delete]
from google.api_core import exceptions
from google.cloud import network_management_v1


def delete_connectivity_test(project_id: str, test_id: str) -> None:
    """Deletes an existing Connectivity Test.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        test_id: The identifier of the Connectivity Test to delete.
    """
    client = network_management_v1.ReachabilityServiceClient()

    name = f"projects/{project_id}/locations/global/connectivityTests/{test_id}"

    request = network_management_v1.DeleteConnectivityTestRequest(name=name)

    try:
        operation = client.delete_connectivity_test(request=request)
        operation.result()
        print(f"Deleted connectivity test: {name}")
    except exceptions.NotFound as exc:
        print(f"Connectivity test not found: {exc}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete connectivity test: {exc}")
# [END networkmanagement_v1_reachabilityservice_connectivitytest_delete]
