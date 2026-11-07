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

# [START serviceusage_v1_serviceusage_batch_get_services]
import google.api_core.exceptions
import google.auth
from google.cloud import service_usage_v1


def batch_get_services() -> None:
    """Retrieve state and configuration for multiple services."""
    _, project_id = google.auth.default()
    client = service_usage_v1.ServiceUsageClient()

    parent = f"projects/{project_id}"

    request = service_usage_v1.BatchGetServicesRequest(
        parent=parent,
        names=[
            f"{parent}/services/compute.googleapis.com",
            f"{parent}/services/storage.googleapis.com",
        ],
    )

    try:
        response = client.batch_get_services(request=request)
        for service in response.services:
            print(f"Service: {service.name}, State: {service.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END serviceusage_v1_serviceusage_batch_get_services]
