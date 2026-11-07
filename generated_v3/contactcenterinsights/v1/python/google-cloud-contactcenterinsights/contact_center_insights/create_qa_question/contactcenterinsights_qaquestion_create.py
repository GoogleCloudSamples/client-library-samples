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

# [START contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
from google.api_core import exceptions
from google.cloud import contact_center_insights_v1


def create_qa_question(
    project_id: str,
    location_id: str,
    qa_scorecard_id: str,
    revision_id: str,
    qa_question_id: str,
) -> None:
    """Create a QA question within an editable QA scorecard revision.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        qa_scorecard_id: The ID of the parent QA scorecard.
        revision_id: The ID of the QA scorecard revision to which this question
          is added.
        qa_question_id: The identifier to use for the QA question, or an empty
          string to allow server generation.
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/qaScorecards/"
        f"{qa_scorecard_id}/revisions/{revision_id}"
    )

    qa_question = contact_center_insights_v1.QaQuestion(
        abbreviation="greeting",
        question_body="Did the agent greet the customer?",
        answer_instructions=(
            "Check whether the agent provided a standard greeting at the"
            " start of the call."
        ),
        answer_choices=[
            contact_center_insights_v1.QaQuestion.AnswerChoice(
                key="yes",
                bool_value=True,
                score=1.0,
            ),
            contact_center_insights_v1.QaQuestion.AnswerChoice(
                key="no",
                bool_value=False,
                score=0.0,
            ),
        ],
    )

    try:
        response = client.create_qa_question(
            parent=parent,
            qa_question=qa_question,
            qa_question_id=qa_question_id,
        )
        print(f"Created QA question: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create QA question: {error.message}")
# [END contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
