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

# [START contactcenterinsights_v1_contactcenterinsights_view_delete]
import google.api_core.exceptions
try:
    from google.cloud import contact_center_insights_v1
    contactcenterinsights_v1 = contact_center_insights_v1
except ImportError:
    from google.cloud import contactcenterinsights_v1
    contact_center_insights_v1 = contactcenterinsights_v1


def delete_view(project_id: str, location_id: str, view_id: str) -> None:
    """Deletes a Contact Center Insights view.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        view_id: The server-generated ID of the View to delete.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    name = f"projects/{project_id}/locations/{location_id}/views/{view_id}"

    try:
        client.delete_view(name=name)
        print(f"Deleted view: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete view: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_view_delete]
