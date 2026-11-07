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

# [START servicedirectory_v1_registrationservice_service_get]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def get_service(
    project_id: str, location_id: str, namespace_id: str, service_id: str
) -> None:
    """Use the get_service method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region/location ID.
        namespace_id: The caller-chosen Service Directory namespace ID.
        service_id: The caller-chosen Service Directory service ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}/services/{service_id}"

    try:
        response = client.get_service(name=name)
        print(f"Retrieved service: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END servicedirectory_v1_registrationservice_service_get]
