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

# [START serviceusage_v1_serviceusage_batch_enable_services]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import service_usage_v1


def batch_enable_services() -> None:
    """Enables multiple services on a project."""
    client = service_usage_v1.ServiceUsageClient()

    _, project_id = google.auth.default()
    project_id = project_id or os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")

    parent = f"projects/{project_id}"
    service_ids = [
        "compute.googleapis.com",
        "storage.googleapis.com",
    ]

    request = service_usage_v1.BatchEnableServicesRequest(
        parent=parent,
        service_ids=service_ids,
    )

    try:
        operation = client.batch_enable_services(request=request)
        response = operation.result()
        for service in response.services:
            print(f"Enabled service: {service.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END serviceusage_v1_serviceusage_batch_enable_services]
