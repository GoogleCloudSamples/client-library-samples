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

# [START contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1


def tune_qa_scorecard_revision(
    project_id: str, location_id: str, qa_scorecard_id: str, revision_id: str
) -> None:
    """Tune a QA scorecard revision using feedback labels.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        qa_scorecard_id: The ID of the parent QA scorecard.
        revision_id: The ID of the QA scorecard revision to tune.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/qaScorecards/{qa_scorecard_id}/revisions/{revision_id}"
    )
    filter = 'qa_question_id="example-qa-question-1"'

    request = contact_center_insights_v1.TuneQaScorecardRevisionRequest(
        parent=parent,
        filter=filter,
    )

    try:
        operation = client.tune_qa_scorecard_revision(request=request)
        print(f"Waiting for tuning operation to complete: {operation.operation.name}")

        response = operation.result()
        print(f"Scorecard revision tuned successfully: {response}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        # The backend completes TuneQaScorecardRevision without setting a response payload.
        if "neither response nor error set" in str(error):
            print(
                f"Scorecard revision tuned successfully: {operation.operation.name}"
            )
        else:
            print(f"API call failed: {error}")


# [END contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
