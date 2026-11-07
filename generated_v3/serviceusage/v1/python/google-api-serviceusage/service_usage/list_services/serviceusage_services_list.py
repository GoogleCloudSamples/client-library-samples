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

# [START serviceusage_v1_serviceusage_services_list]
from google.api_core import exceptions
from google.cloud import service_usage_v1


def list_services(project_id: str) -> None:
    """Lists enabled services for a Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = service_usage_v1.ServiceUsageClient()
    parent = f"projects/{project_id}"
    request = service_usage_v1.ListServicesRequest(
        parent=parent,
        filter="state:ENABLED",
    )

    try:
        response = client.list_services(request=request)
        for service in response:
            print(f"Name: {service.name}")
            print(f"State: {service.state.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list services: {error}")
# [END serviceusage_v1_serviceusage_services_list]
