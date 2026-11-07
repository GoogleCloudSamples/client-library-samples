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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_sites_list]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha


def list_sites(project_id: str, location_id: str) -> None:
    """List sites in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = gdchardwaremanagement_v1alpha.ListSitesRequest(
        parent=parent,
    )

    try:
        response = client.list_sites(request=request)
        site_count = 0
        for site in response:
            print(f"Site resource name: {site.name}")
            site_count += 1

        if site_count == 0:
            print("No sites found.")
        else:
            print(f"Total sites: {site_count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_sites_list]
