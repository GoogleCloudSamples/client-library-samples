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

# [START contactcenterinsights_v1_contactcenterinsights_calculate_issue_model_stats]
from google.api_core import exceptions
from google.cloud import contact_center_insights_v1


def calculate_issue_model_stats(
    project_id: str, location_id: str, issue_model_id: str
) -> None:
    """Calculates statistics for an issue model.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID where the issue
          model resides (for example, 'us-central1').
        issue_model_id: The ID of the issue model.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    issue_model = (
        f"projects/{project_id}/locations/{location_id}/issueModels/{issue_model_id}"
    )

    request = contact_center_insights_v1.CalculateIssueModelStatsRequest(
        issue_model=issue_model,
    )

    try:
        response = client.calculate_issue_model_stats(request=request)
        print(
            f"Analyzed conversations: {response.current_stats.analyzed_conversations_count}"
        )
        print(
            f"Unclassified conversations: {response.current_stats.unclassified_conversations_count}"
        )
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to calculate issue model statistics: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_calculate_issue_model_stats]
