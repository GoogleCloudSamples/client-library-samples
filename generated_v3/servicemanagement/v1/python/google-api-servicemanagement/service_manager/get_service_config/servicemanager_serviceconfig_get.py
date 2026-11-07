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

# [START servicemanagement_v1_servicemanager_serviceconfig_get]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def get_service_config(config_id: str, service_name: str) -> None:
    """Retrieves a configuration version for a managed service.

    Args:
        config_id: The ID of the service configuration resource (for example, '2021-01-01R0').
        service_name: The name of the service (for example, 'example.googleapis.com').
    """
    request = servicemanagement_v1.GetServiceConfigRequest(
        service_name=service_name,
        config_id=config_id,
        view=servicemanagement_v1.GetServiceConfigRequest.ConfigView.FULL,
    )

    try:
        response = client.get_service_config(request=request)
        print(f"Service config name: {response.name}")
        print(f"Configuration ID: {response.id}")
        print(f"Service title: {response.title}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve service configuration: {error}")
# [END servicemanagement_v1_servicemanager_serviceconfig_get]
