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

# [START contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1


def create_analysis_rule(project_id: str, location_id: str) -> None:
    """Creates an analysis rule in Contact Center Insights.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    annotator_selector = contact_center_insights_v1.AnnotatorSelector(
        run_sentiment_annotator=True,
        run_silence_annotator=True,
    )

    analysis_rule = contact_center_insights_v1.AnalysisRule(
        display_name="example-analysis-rule",
        active=True,
        analysis_percentage=0.5,
        annotator_selector=annotator_selector,
    )

    try:
        response = client.create_analysis_rule(
            parent=parent,
            analysis_rule=analysis_rule,
        )
        print(f"Created analysis rule: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating analysis rule: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
