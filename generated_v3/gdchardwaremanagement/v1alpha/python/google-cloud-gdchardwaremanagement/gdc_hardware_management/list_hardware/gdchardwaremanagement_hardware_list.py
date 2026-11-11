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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardware_list]
from google.api_core import exceptions
from google.cloud import gdchardwaremanagement_v1alpha


def list_hardware(project_id: str, location_id: str) -> None:
    """Lists hardware resources in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    request = gdchardwaremanagement_v1alpha.ListHardwareRequest(
        parent=parent,
    )

    try:
        response = client.list_hardware(request=request)
        hardware_found = False
        for hardware in response:
            print(f"Hardware name: {hardware.name}")
            hardware_found = True

        if not hardware_found:
            print("No hardware resources found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list hardware: {error}")


# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardware_list]
