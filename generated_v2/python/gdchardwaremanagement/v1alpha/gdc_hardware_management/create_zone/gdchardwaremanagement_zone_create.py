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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def create_zone(project_id: str, location_id: str, zone_id: str) -> None:
    """Use the create_zone method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        zone_id: The ID to use for the zone, which will become the final component of the zone's resource name.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    zone = gdchardwaremanagement_v1alpha.Zone(
        display_name="Example Zone",
        contacts=[
            gdchardwaremanagement_v1alpha.Contact(
                given_name="Alex",
                email="alex@example.com",
                phone="+15550100999",
            )
        ],
    )

    try:
        operation = client.create_zone(
            parent=parent,
            zone_id=zone_id,
            zone=zone,
        )
        response = operation.result()
        print(f"Zone created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create zone: {error}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_create]
