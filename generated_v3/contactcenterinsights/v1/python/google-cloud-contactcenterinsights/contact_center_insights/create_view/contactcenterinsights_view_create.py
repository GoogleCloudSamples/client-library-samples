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

# [START contactcenterinsights_v1_contactcenterinsights_view_create]
from google.api_core import exceptions
from google.cloud import contact_center_insights_v1


def create_view(project_id: str, location_id: str) -> None:
    """Creates a view in Contact Center Insights.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    view = contact_center_insights_v1.View(
        display_name="Sample View",
        value='medium = "PHONE_CALL"',
    )

    try:
        response = client.create_view(parent=parent, view=view)
        print(f"Created view name: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API error creating view: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_view_create]
