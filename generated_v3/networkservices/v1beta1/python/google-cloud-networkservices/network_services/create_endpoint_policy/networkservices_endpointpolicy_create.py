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

# [START networkservices_v1beta1_networkservices_endpointpolicy_create]
from google.api_core import exceptions
try:
    from google.cloud import network_services_v1beta1 as network_services_v1
except ImportError:
    from google.cloud import network_services_v1


def create_endpoint_policy(
    project_id: str, endpoint_policy_id: str, location_id: str
) -> None:
    """Creates a Network Services endpoint policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        endpoint_policy_id: Caller-chosen identifier of the EndpointPolicy (for example, 'example-endpoint-policy').
        location_id: The location for the EndpointPolicy (for example, 'global'). EndpointPolicy requires 'global'.
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    endpoint_matcher = network_services_v1.EndpointMatcher(
        metadata_label_matcher=network_services_v1.EndpointMatcher.MetadataLabelMatcher(
            metadata_label_match_criteria=network_services_v1.EndpointMatcher.MetadataLabelMatcher.MetadataLabelMatchCriteria.MATCH_ANY
        )
    )
    endpoint_policy = network_services_v1.EndpointPolicy(
        type_=network_services_v1.EndpointPolicy.EndpointPolicyType.SIDECAR_PROXY,
        endpoint_matcher=endpoint_matcher,
    )

    try:
        operation = client.create_endpoint_policy(
            parent=parent,
            endpoint_policy_id=endpoint_policy_id,
            endpoint_policy=endpoint_policy,
        )
        response = operation.result()
        print(f"Created endpoint policy: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create endpoint policy: {e}")
# [END networkservices_v1beta1_networkservices_endpointpolicy_create]
