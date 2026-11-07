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

# [START serviceusage_v1_serviceusage_enable_service]
import google.api_core.exceptions
import google.auth
from google.cloud import service_usage_v1


def enable_service() -> None:
    """Enables a service for a project."""
    client = service_usage_v1.ServiceUsageClient()
    _, project_id = google.auth.default()

    service_name = "compute.googleapis.com"
    resource_name = f"projects/{project_id}/services/{service_name}"

    request = service_usage_v1.EnableServiceRequest(
        name=resource_name,
    )

    try:
        operation = client.enable_service(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        response = operation.result()
        print(f"Service state: {response.service.state.name}")
        print(f"Enabled service: {response.service.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to enable service: {error}")
# [END serviceusage_v1_serviceusage_enable_service]
