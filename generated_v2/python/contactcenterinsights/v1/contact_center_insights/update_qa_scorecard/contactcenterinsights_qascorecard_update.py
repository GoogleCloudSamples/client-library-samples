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

# [START contactcenterinsights_v1_contactcenterinsights_qascorecard_update]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1
from google.protobuf import field_mask_pb2


def update_qa_scorecard(
    project_id: str, location_id: str, qa_scorecard_id: str
) -> None:
    """Updates an existing QA scorecard.

    Args:
        project_id: The Google Cloud project ID hosting the QA scorecard.
        location_id: The Google Cloud region/location where the QA scorecard is located.
        qa_scorecard_id: The ID of the QA scorecard to update.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    qa_scorecard = contact_center_insights_v1.QaScorecard(
        name=f"projects/{project_id}/locations/{location_id}/qaScorecards/{qa_scorecard_id}",
        description="Updated description for evaluation criteria.",
    )

    try:
        response = client.update_qa_scorecard(
            qa_scorecard=qa_scorecard,
            update_mask=update_mask,
        )
        print(f"Updated QA scorecard: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error occurred: {e}")


# [END contactcenterinsights_v1_contactcenterinsights_qascorecard_update]
