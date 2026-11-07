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

# [START contactcenterinsights_v1_contactcenterinsights_issuemodels_list]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1


def list_issue_models(project_id: str, location_id: str) -> None:
    """Lists issue models for a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = contact_center_insights_v1.ListIssueModelsRequest(
        parent=parent,
    )

    try:
        response = client.list_issue_models(request=request)
        for issue_model in response.issue_models:
            print(f"Model name: {issue_model.name}")
            print(f"Display name: {issue_model.display_name}")
            print(f"State: {issue_model.state.name}")

        if not response.issue_models:
            print(f"No issue models found for {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list issue models: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_issuemodels_list]
