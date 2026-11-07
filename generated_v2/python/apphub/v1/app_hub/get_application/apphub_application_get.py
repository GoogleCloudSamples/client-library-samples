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

# [START apphub_v1_apphub_application_get]
import google.api_core.exceptions
from google.cloud import apphub_v1

client = apphub_v1.AppHubClient()


def get_application(project_id: str, location_id: str, application_id: str) -> None:
    """Retrieves an App Hub Application.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global' or
          'us-central1').
        application_id: The identifier of the existing Application to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/applications/{application_id}"

    request = apphub_v1.GetApplicationRequest(
        name=name,
    )

    try:
        response = client.get_application(request=request)
        print(f"Application retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve application: {error}")
# [END apphub_v1_apphub_application_get]
