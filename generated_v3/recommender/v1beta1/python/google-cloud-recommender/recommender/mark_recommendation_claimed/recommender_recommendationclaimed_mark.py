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

# [START recommender_v1beta1_recommender_mark_recommendation_claimed]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1


def mark_recommendation_claimed(
    project_id: str,
    location_id: str,
    recommender_id: str,
    recommendation_id: str,
    etag: str,
) -> None:
    """Marks a recommendation as claimed.

    Args:
        project_id: The Google Cloud project ID where the recommendation is hosted.
        location_id: The Google Cloud location of the recommender (for example, 'global' or 'us-central1').
        recommender_id: The recommender identifier (for example, 'google.compute.instance.MachineTypeRecommender').
        recommendation_id: The server-generated ID of the recommendation to claim.
        etag: Server-generated fingerprint of the recommendation, used for optimistic concurrency control.
    """
    client = recommender_v1beta1.RecommenderClient()

    # Enforce quotation wrapping on the ETag required by the Recommender API
    if not (etag.startswith('"') and etag.endswith('"')):
        etag = f'"{etag}"'

    name = client.recommendation_path(
        project_id, location_id, recommender_id, recommendation_id
    )
    state_metadata = {"claimed_by": "example_user"}

    try:
        response = client.mark_recommendation_claimed(
            name=name,
            state_metadata=state_metadata,
            etag=etag,
        )
        print(f"Claimed recommendation: {response.name}")
        print(f"State: {response.state_info.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to mark recommendation as claimed: {e}")
# [END recommender_v1beta1_recommender_mark_recommendation_claimed]
