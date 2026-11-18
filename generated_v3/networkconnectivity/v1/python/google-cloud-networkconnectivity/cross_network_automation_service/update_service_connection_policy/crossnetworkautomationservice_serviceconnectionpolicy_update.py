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

# [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1
from google.protobuf import field_mask_pb2

client = networkconnectivity_v1.CrossNetworkAutomationServiceClient()


def update_service_connection_policy(
    project_id: str, location_id: str, service_connection_policy_id: str
) -> None:
    """Updates an existing service connection policy.

    Args:
        project_id: The Google Cloud project ID where the policy resides.
        location_id: The Google Cloud location of the policy.
        service_connection_policy_id: The identifier of the policy to update.
    """
    policy_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"serviceConnectionPolicies/{service_connection_policy_id}"
    )

    service_connection_policy = networkconnectivity_v1.ServiceConnectionPolicy(
        name=policy_name,
        description="Updated service connection policy description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_service_connection_policy(
            service_connection_policy=service_connection_policy,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated service connection policy: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Update failed with API call error: {error}")
# [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
