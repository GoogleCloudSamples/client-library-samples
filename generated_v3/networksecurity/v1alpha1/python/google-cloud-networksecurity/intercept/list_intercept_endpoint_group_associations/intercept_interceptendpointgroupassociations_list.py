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

# [START networksecurity_v1alpha1_intercept_interceptendpointgroupassociations_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_intercept_endpoint_group_associations(
    project_id: str, location_id: str
) -> None:
    """Lists intercept endpoint group associations in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location for the endpoint group associations (for example, "global").
    """
    client = network_security_v1alpha1.InterceptClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListInterceptEndpointGroupAssociationsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_intercept_endpoint_group_associations(request=request)
        for association in page_result:
            print(f"Association name: {association.name}")
            print(f"Intercept endpoint group: {association.intercept_endpoint_group}")
            print(f"Network: {association.network}")
            print(f"State: {association.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networksecurity_v1alpha1_intercept_interceptendpointgroupassociations_list]
