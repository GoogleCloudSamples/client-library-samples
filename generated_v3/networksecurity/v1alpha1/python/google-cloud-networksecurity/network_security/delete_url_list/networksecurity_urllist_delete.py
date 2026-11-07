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

# [START networksecurity_v1alpha1_networksecurity_urllist_delete]
import google.api_core.exceptions
from google.cloud import network_security_v1

client = network_security_v1.NetworkSecurityClient()


def delete_url_list(project_id: str, location_id: str, url_list_id: str) -> None:
    """Deletes a UrlList resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        url_list_id: ID of the UrlList (for example, 'example-urllist-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/urlLists/{url_list_id}"

    try:
        operation = client.delete_url_list(name=name)
        print("Waiting for operation to complete...")
        operation.result()
        print(f"Deleted UrlList: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete UrlList: {error}")


# [END networksecurity_v1alpha1_networksecurity_urllist_delete]
