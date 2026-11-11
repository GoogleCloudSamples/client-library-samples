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

# [START servicedirectory_v1_registrationservice_namespace_create]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.RegistrationServiceClient()


def create_namespace(namespace_id: str, project_id: str, location_id: str) -> None:
    """Creates a Service Directory namespace in a given project and location.

    Args:
        namespace_id: The resource ID of the namespace to create.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    namespace = servicedirectory_v1.Namespace(
        labels={"environment": "example-environment"}
    )

    try:
        response = client.create_namespace(
            parent=parent,
            namespace=namespace,
            namespace_id=namespace_id,
        )
        print(f"Created namespace: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END servicedirectory_v1_registrationservice_namespace_create]
