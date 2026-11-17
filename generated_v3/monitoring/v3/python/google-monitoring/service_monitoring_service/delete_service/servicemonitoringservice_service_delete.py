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

# [START monitoring_v3_servicemonitoringservice_service_delete]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.ServiceMonitoringServiceClient()


def delete_service(service_id: str, project_id: str) -> None:
    """Deletes a service from Cloud Monitoring.

    Args:
        service_id: The ID of the service to delete. Sourced from the
          user-specified ID or the server-generated identifier returned when the
          service was created.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/services/{service_id}"

    try:
        client.delete_service(name=name)
        print(f"Deleted service: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete service: {error}")
# [END monitoring_v3_servicemonitoringservice_service_delete]
