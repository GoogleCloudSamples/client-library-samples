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

# [START contactcenterinsights_v1_contactcenterinsights_view_get]
from google.api_core import exceptions
from google.cloud import contact_center_insights_v1


def get_view(project_id: str, location_id: str, view_id: str) -> None:
    """Retrieves an existing Contact Center Insights view.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        view_id: The server-generated ID of the view to get.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    name = f"projects/{project_id}/locations/{location_id}/views/{view_id}"

    request = contact_center_insights_v1.GetViewRequest(
        name=name,
    )

    try:
        response = client.get_view(request=request)
        print(f"Retrieved view: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"View filter: {response.value}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve view: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_view_get]
