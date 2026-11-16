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

# [START licensemanager_v1_licensemanager_instances_list]
import google.api_core.exceptions
from google.cloud import licensemanager_v1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists License Manager instances in a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
    """
    client = licensemanager_v1.LicenseManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = licensemanager_v1.ListInstancesRequest(parent=parent)
        page_result = client.list_instances(request=request)

        count = 0
        for instance in page_result:
            print(f"Instance: {instance.name}")
            count += 1

        if count == 0:
            print("No instances found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing instances: {error}")
# [END licensemanager_v1_licensemanager_instances_list]
