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

# [START recommender_v1_recommender_insights_list]
import google.api_core.exceptions
from google.cloud import recommender_v1


def list_insights(location_id: str, insight_type_id: str, project_id: str) -> None:
    """List insights for a project, location, and insight type.

    Args:
        location_id: The Google Cloud location (for example, 'global' or 'us-central1').
        insight_type_id: The Google-defined InsightType ID (for example, 'google.compute.firewall.Insight').
        project_id: The Google Cloud project ID.
    """
    client = recommender_v1.RecommenderClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/insightTypes/{insight_type_id}"
    )

    request = recommender_v1.ListInsightsRequest(
        parent=parent,
    )

    try:
        response = client.list_insights(request=request)
        found_insights = False
        for insight in response:
            found_insights = True
            print(f"Name: {insight.name}")
            print(f"Description: {insight.description}")
            print(f"Severity: {insight.severity.name}")
            print(f"Category: {insight.category.name}")

        if not found_insights:
            print("No insights found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving insights: {error}")
# [END recommender_v1_recommender_insights_list]
