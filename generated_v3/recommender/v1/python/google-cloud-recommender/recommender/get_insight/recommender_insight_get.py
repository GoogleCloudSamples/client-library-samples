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

# [START recommender_v1_recommender_insight_get]
import google.api_core.exceptions
from google.cloud import recommender_v1

client = recommender_v1.RecommenderClient()


def get_insight(
    project_id: str, location_id: str, insight_type_id: str, insight_id: str
) -> None:
    """Retrieves a specific insight by resource name.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or 'global'.
        insight_type_id: The insight type identifier (for example,
          'google.compute.firewall.Insight').
        insight_id: The server-generated ID of the insight to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"insightTypes/{insight_type_id}/insights/{insight_id}"
    )

    try:
        response = client.get_insight(name=name)
        print(f"Insight name: {response.name}")
        print(f"Description: {response.description}")
        print(f"State: {response.state_info.state.name}")
        print(f"Severity: {response.severity.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END recommender_v1_recommender_insight_get]
