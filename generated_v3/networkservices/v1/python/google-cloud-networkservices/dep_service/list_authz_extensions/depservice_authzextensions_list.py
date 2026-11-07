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

# [START networkservices_v1_depservice_authzextensions_list]
import google.api_core.exceptions
from google.cloud import network_services_v1


def list_authz_extensions(project_id: str, location_id: str) -> None:
    """Lists AuthzExtension resources in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = network_services_v1.DepServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_services_v1.ListAuthzExtensionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_authz_extensions(request=request)
        for authz_extension in page_result:
            print(f"AuthzExtension: {authz_extension.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networkservices_v1_depservice_authzextensions_list]
