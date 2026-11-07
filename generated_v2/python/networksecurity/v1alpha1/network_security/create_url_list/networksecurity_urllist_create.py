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

# [START networksecurity_create_url_list]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Creates a UrlList resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the resource is located.
        url_list_id: The unique identifier for the URL list.
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    url_list = network_security_v1.UrlList(
        values=["example.com", "about.example.com"]
    )

    try:
        operation = client.create_url_list(
            parent=parent,
            url_list_id=url_list_id,
            url_list=url_list,
        )
        response = operation.result()
        print(f"Created URL list: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create URL list: {error}")


# [END networksecurity_create_url_list]
