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

# [START networkmanagement_v1_reachabilityservice_connectivitytest_create]
import google.api_core.exceptions
from google.cloud import network_management_v1


def create_connectivity_test(project_id: str, test_id: str) -> None:
    """Creates a Network Management connectivity test.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        test_id: The identifier for the connectivity test (for example, 'example-test-id').
    """
    client = network_management_v1.ReachabilityServiceClient()

    parent = f"projects/{project_id}/locations/global"
    resource = network_management_v1.ConnectivityTest(
        description="Reachability test between two IP addresses",
        source=network_management_v1.Endpoint(
            ip_address="10.0.0.1",
            network=f"projects/{project_id}/global/networks/default",
        ),
        destination=network_management_v1.Endpoint(
            ip_address="10.0.0.2",
            port=80,
            network=f"projects/{project_id}/global/networks/default",
        ),
        protocol="TCP",
    )

    try:
        operation = client.create_connectivity_test(
            parent=parent,
            test_id=test_id,
            resource=resource,
        )
        response = operation.result()
        print(f"Created connectivity test: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Operation failed with error: {error}")


# [END networkmanagement_v1_reachabilityservice_connectivitytest_create]
