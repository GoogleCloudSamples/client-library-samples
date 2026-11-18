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

# [START networkservices_v1_networkservices_endpointpolicy_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_endpoint_policy(
    project_id: str, location_id: str, endpoint_policy_id: str
) -> None:
    """Creates a Network Services EndpointPolicy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        endpoint_policy_id: ID of the EndpointPolicy (for example, 'example-endpointpolicy-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    endpoint_matcher = network_services_v1.EndpointMatcher(
        metadata_label_matcher=network_services_v1.EndpointMatcher.MetadataLabelMatcher(
            metadata_label_match_criteria=network_services_v1.EndpointMatcher.MetadataLabelMatcher.MetadataLabelMatchCriteria.MATCH_ALL
        )
    )

    endpoint_policy = network_services_v1.EndpointPolicy(
        type_=network_services_v1.EndpointPolicy.EndpointPolicyType.SIDECAR_PROXY,
        endpoint_matcher=endpoint_matcher,
        description="Endpoint policy configuration",
    )

    request = network_services_v1.CreateEndpointPolicyRequest(
        parent=parent,
        endpoint_policy_id=endpoint_policy_id,
        endpoint_policy=endpoint_policy,
    )

    try:
        operation = client.create_endpoint_policy(request=request)
        response = operation.result()
        print(f"Created endpoint policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create endpoint policy: {e}")
# [END networkservices_v1_networkservices_endpointpolicy_create]
