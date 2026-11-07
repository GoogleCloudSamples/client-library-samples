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

# [START networksecurity_v1alpha1_networksecurity_urllist_update]
import google.api_core.exceptions
from google.cloud import network_security_v1
from google.protobuf import field_mask_pb2


def update_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Updates an existing URL list resource.

    Args:
        project_id: Google Cloud project ID.
        location_id: The location ID for the UrlList (for example, 'global' or a supported Google Cloud region).
        url_list_id: The identifier of the existing UrlList resource to update. Must start with a lowercase letter and contain only lowercase letters, digits, and hyphens (1-63 characters).
    """
    client = network_security_v1.NetworkSecurityClient()

    url_list = network_security_v1.UrlList(
        name=f"projects/{project_id}/locations/{location_id}/urlLists/{url_list_id}",
        description="Updated description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_url_list(
            url_list=url_list,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated URL list: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networksecurity_v1alpha1_networksecurity_urllist_update]
