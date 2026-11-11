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

# [START servicemanagement_v1_servicemanager_serviceconfigs_list]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def list_service_configs(service_name: str) -> None:
    """Lists configuration versions for a specified service.

    Args:
        service_name: Required. The name of the service (for example, `example.googleapis.com`).
    """
    try:
        request = servicemanagement_v1.ListServiceConfigsRequest(
            service_name=service_name,
        )
        page_result = client.list_service_configs(request=request)

        for config in page_result:
            print(f"Configuration ID: {config.id}")
            print(f"Service Name: {config.name}")
            print(f"Title: {config.title}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END servicemanagement_v1_servicemanager_serviceconfigs_list]
