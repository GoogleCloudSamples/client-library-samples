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

# [START networksecurity_v1_networksecurity_urllist_get]
from google.api_core import exceptions
from google.cloud import network_security_v1


def get_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Gets details of a single UrlList resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        url_list_id: The URL list ID (for example, 'example-urllist-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    name = client.url_list_path(project_id, location_id, url_list_id)

    try:
        response = client.get_url_list(name=name)
        print(f"Retrieved URL list: {response.name}")
    except exceptions.NotFound:
        print(f"URL list resource not found: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call error occurred: {error}")


# [END networksecurity_v1_networksecurity_urllist_get]
