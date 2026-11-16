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

# [START recommender_v1beta1_recommender_mark_insight_accepted]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1

client = recommender_v1beta1.RecommenderClient()


def mark_insight_accepted(
    project_id: str,
    location_id: str,
    insight_type_id: str,
    insight_id: str,
) -> None:
    """Marks an insight as accepted.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
        insight_type_id: The insight type identifier (for example, 'google.iam.policy.Insight').
        insight_id: The server-generated ID of the insight.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"insightTypes/{insight_type_id}/insights/{insight_id}"
    )

    try:
        # Retrieve the target insight to get its current etag for safe concurrency control
        active_insight = client.get_insight(name=name)
        etag = active_insight.etag
        state_metadata = {"review_notes": "Accepted after architecture review"}

        response = client.mark_insight_accepted(
            name=name,
            state_metadata=state_metadata,
            etag=etag,
        )

        print(f"Marked insight as accepted: {response.name}")
        print(f"Insight state: {response.state_info.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")


# [END recommender_v1beta1_recommender_mark_insight_accepted]
