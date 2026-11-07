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

# [START serviceusage_v1_serviceusage_service_get]
import google.auth
from google.api_core import exceptions
from google.cloud import service_usage_v1


def get_service() -> None:
    """Retrieve the state of a service."""
    _, project_id = google.auth.default()

    client = service_usage_v1.ServiceUsageClient()

    service_name = "compute.googleapis.com"
    resource_name = f"projects/{project_id}/services/{service_name}"

    request = service_usage_v1.GetServiceRequest(name=resource_name)

    try:
        response = client.get_service(request=request)
        print(f"Service Name: {response.name}")
        print(f"Service State: {response.state.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to get service status: {error}")
# [END serviceusage_v1_serviceusage_service_get]
