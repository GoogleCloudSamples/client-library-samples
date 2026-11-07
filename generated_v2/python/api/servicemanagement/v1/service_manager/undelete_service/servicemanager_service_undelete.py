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

# [START servicemanagement_v1_servicemanager_undelete_service]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def undelete_service(service_name: str) -> None:
    """Restores a previously deleted managed service.

    Args:
        service_name: The name of the service to undelete (for example,
          `example.googleapis.com`).
    """
    request = servicemanagement_v1.UndeleteServiceRequest(
        service_name=service_name,
    )

    try:
        # Initiate the undelete operation and wait for completion.
        operation = client.undelete_service(request=request)
        response = operation.result()
        print(f"Successfully undeleted service: {response.service.service_name}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to undelete service: {err}")
# [END servicemanagement_v1_servicemanager_undelete_service]
