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

# [START networksecurity_v1_networksecurity_urllist_update]
from google.api_core import exceptions
from google.cloud import network_security_v1
from google.protobuf import field_mask_pb2


def update_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Updates an existing URL list resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location (for example, 'global' or a supported region).
        url_list_id: The identifier of the URL list to update.
    """
    client = network_security_v1.NetworkSecurityClient()

    url_list = network_security_v1.UrlList(
        name=f"projects/{project_id}/locations/{location_id}/urlLists/{url_list_id}",
        description="Updated URL list description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_url_list(
            url_list=url_list,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated URL list: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update URL list: {error}")
# [END networksecurity_v1_networksecurity_urllist_update]
