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

# [START contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1


def create_qa_scorecard(
    project_id: str, location_id: str, qa_scorecard_id: str
) -> None:
    """Creates a QA scorecard in Contact Center Insights.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID, such as 'us-central1'.
        qa_scorecard_id: The identifier for the QA scorecard.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    qa_scorecard = contact_center_insights_v1.QaScorecard(
        display_name="Sample QA Scorecard",
        description="A scorecard for evaluating conversations",
    )

    try:
        response = client.create_qa_scorecard(
            parent=parent,
            qa_scorecard=qa_scorecard,
            qa_scorecard_id=qa_scorecard_id,
        )
        print(f"Created QA scorecard: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create QA scorecard: {error}")


# [END contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
