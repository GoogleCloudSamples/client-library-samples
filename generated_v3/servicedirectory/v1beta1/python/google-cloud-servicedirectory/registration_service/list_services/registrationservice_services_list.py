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

# [START servicedirectory_v1beta1_registrationservice_services_list]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1

client = servicedirectory_v1beta1.RegistrationServiceClient()


def list_services(project_id: str, location_id: str, namespace_id: str) -> None:
    """Lists services in a Service Directory namespace.

    Args:
        project_id: The Google Cloud project ID containing the Service Directory namespace.
        location_id: The Google Cloud region or location of the namespace (for example, 'us-central1').
        namespace_id: The ID of the Service Directory namespace whose services to list.
    """
    parent = client.namespace_path(project_id, location_id, namespace_id)

    try:
        response = client.list_services(parent=parent)
        for service in response:
            print(f"Service name: {service.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list services: {error}")
# [END servicedirectory_v1beta1_registrationservice_services_list]
