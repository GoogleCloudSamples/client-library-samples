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

# [START networkmanagement_v1_reachabilityservice_connectivitytest_update]
import google.api_core.exceptions
from google.cloud import network_management_v1
from google.protobuf import field_mask_pb2


def update_connectivity_test(project_id: str, test_id: str) -> None:
    """Updates the description of an existing Connectivity Test.

    Args:
        project_id: The Google Cloud project ID.
        test_id: The ID of the connectivity test to update.
    """
    client = network_management_v1.ReachabilityServiceClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    resource = network_management_v1.ConnectivityTest(
        name=f"projects/{project_id}/locations/global/connectivityTests/{test_id}",
        description="Updated connectivity test description",
    )

    try:
        operation = client.update_connectivity_test(
            update_mask=update_mask,
            resource=resource,
        )
        response = operation.result()
        print(f"Connectivity test updated: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed: {e}")
# [END networkmanagement_v1_reachabilityservice_connectivitytest_update]
