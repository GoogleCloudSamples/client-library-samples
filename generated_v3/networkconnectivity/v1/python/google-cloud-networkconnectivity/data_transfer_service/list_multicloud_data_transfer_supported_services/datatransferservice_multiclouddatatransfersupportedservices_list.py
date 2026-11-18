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

# [START networkconnectivity_v1_datatransferservice_multiclouddatatransfersupportedservices_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1


def list_multicloud_data_transfer_supported_services(
    project_id: str, location_id: str
) -> None:
    """Lists supported multicloud data transfer services in a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = networkconnectivity_v1.DataTransferServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = (
        networkconnectivity_v1.ListMulticloudDataTransferSupportedServicesRequest(
            parent=parent
        )
    )

    try:
        response = client.list_multicloud_data_transfer_supported_services(
            request=request
        )
        count = 0
        for service in response:
            print(f"Service name: {service.name}")
            count += 1
        print(f"Total supported services found: {count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list supported services: {error}")


# [END networkconnectivity_v1_datatransferservice_multiclouddatatransfersupportedservices_list]
