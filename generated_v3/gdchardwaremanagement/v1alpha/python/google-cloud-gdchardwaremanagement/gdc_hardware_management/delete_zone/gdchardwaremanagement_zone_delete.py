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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_delete]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def delete_zone(project_id: str, location_id: str, zone_id: str) -> None:
    """Deletes a zone.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        zone_id: The Google Cloud zone where the service is located (for example, 'us-central1-c')
    """
    name = client.zone_path(project_id, location_id, zone_id)

    request = gdchardwaremanagement_v1alpha.DeleteZoneRequest(
        name=name,
    )

    try:
        operation = client.delete_zone(request=request)
        operation.result()
        print(f"Deleted zone: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete zone: {e}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_delete]
