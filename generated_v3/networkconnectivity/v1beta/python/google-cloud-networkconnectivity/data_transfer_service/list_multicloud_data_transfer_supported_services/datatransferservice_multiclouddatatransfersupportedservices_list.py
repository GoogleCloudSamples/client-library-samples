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

# [START networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def list_multicloud_data_transfer_supported_services(
    project_id: str, location_id: str
) -> None:
    """Lists Multicloud Data Transfer supported services for a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, "us-central1").
    """
    client = networkconnectivity_v1beta.DataTransferServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_multicloud_data_transfer_supported_services(
            parent=parent
        )
        count = 0
        for service in response:
            print(f"Supported service: {service.name}")
            count += 1
        if count == 0:
            print(f"No supported services found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
