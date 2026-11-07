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

# [START apphub_v1_apphub_services_list]
import google.api_core.exceptions
from google.cloud import apphub_v1


def list_services(project_id: str, location_id: str, application_id: str) -> None:
    """Lists registered services in an application.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        application_id: The AppHub application ID (for example, 'example-application-id').
    """
    client = apphub_v1.AppHubClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/applications/{application_id}"
    )

    request = apphub_v1.ListServicesRequest(
        parent=parent,
    )

    try:
        response = client.list_services(request=request)
        count = 0
        for service in response:
            print(f"Service name: {service.name}")
            print(f"Display name: {service.display_name}")
            count += 1
        print(f"Total services found: {count}")
    except google.api_core.exceptions.GoogleAPIError as error:
        print(f"Failed to list services: {error}")


# [END apphub_v1_apphub_services_list]
