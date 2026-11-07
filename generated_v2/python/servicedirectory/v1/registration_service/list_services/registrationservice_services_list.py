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

# [START servicedirectory_v1_registrationservice_services_list]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def list_services(project_id: str, location_id: str, namespace_id: str) -> None:
    """List services registered in a Service Directory namespace.

    Args:
        project_id: The Google Cloud project ID where the namespace resides.
        location_id: The Google Cloud region or location of the namespace.
        namespace_id: The identifier of the Service Directory namespace whose services are listed.
    """
    parent = client.namespace_path(project_id, location_id, namespace_id)

    try:
        services = client.list_services(parent=parent)
        for service in services:
            print(f"Service name: {service.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END servicedirectory_v1_registrationservice_services_list]
