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

# [START servicemanagement_v1_servicemanager_services_list]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def list_services(producer_project_id: str) -> None:
    """Lists managed services owned by a specific producer project.

    Args:
        producer_project_id: The Google Cloud project ID that produces and owns the managed services to list.
    """
    request = servicemanagement_v1.ListServicesRequest(
        producer_project_id=producer_project_id,
    )

    try:
        page_result = client.list_services(request=request)
        for service in page_result:
            print(f"Service Name: {service.service_name}")
            print(f"Producer Project ID: {service.producer_project_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END servicemanagement_v1_servicemanager_services_list]
