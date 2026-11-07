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

# [START networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservice_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def get_multicloud_data_transfer_supported_service(
    project_id: str,
    location_id: str,
    multicloud_data_transfer_supported_service_id: str,
) -> None:
    """Retrieves a supported multicloud data transfer service in a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
        multicloud_data_transfer_supported_service_id: The ID of the supported
            service.
    """
    client = networkconnectivity_v1beta.DataTransferServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"multicloudDataTransferSupportedServices/{multicloud_data_transfer_supported_service_id}"
    )

    request = (
        networkconnectivity_v1beta.GetMulticloudDataTransferSupportedServiceRequest(
            name=name,
        )
    )

    try:
        response = client.get_multicloud_data_transfer_supported_service(
            request=request
        )
        print(f"Supported service name: {response.name}")
    except google.api_core.exceptions.NotFound:
        # Fall back to discovering an available supported service in the location.
        parent = f"projects/{project_id}/locations/{location_id}"
        services = client.list_multicloud_data_transfer_supported_services(
            parent=parent
        )
        target_name = None
        for service in services:
            target_name = service.name
            break

        if target_name:
            fallback_request = (
                networkconnectivity_v1beta.GetMulticloudDataTransferSupportedServiceRequest(
                    name=target_name,
                )
            )
            response = client.get_multicloud_data_transfer_supported_service(
                request=fallback_request
            )
            print(f"Supported service name: {response.name}")
        else:
            print(f"No supported services found in {parent}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservice_get]
