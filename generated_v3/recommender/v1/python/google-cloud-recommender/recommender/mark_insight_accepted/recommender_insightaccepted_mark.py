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

# [START recommender_v1_recommender_mark_insight_accepted]
import google.api_core.exceptions
from google.cloud import recommender_v1


def mark_insight_accepted(
    project_id: str,
    location_id: str,
    insight_type_id: str,
    insight_id: str,
    etag: str,
) -> None:
    """Marks an insight as accepted.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global' or 'us-central1').
        insight_type_id: The insight type identifier.
        insight_id: The server-generated ID of the insight.
        etag: The fingerprint of the insight for optimistic concurrency control.
    """
    client = recommender_v1.RecommenderClient()

    name = f"projects/{project_id}/locations/{location_id}/insightTypes/{insight_type_id}/insights/{insight_id}"

    # Recommender API expects etags to be enclosed in double quotes.
    if not (etag.startswith('"') and etag.endswith('"')):
        etag = f'"{etag}"'

    request = recommender_v1.MarkInsightAcceptedRequest(
        name=name,
        etag=etag,
        state_metadata={"accepted_by": "example-user"},
    )

    try:
        response = client.mark_insight_accepted(request=request)
        print(f"Insight marked as accepted: {response.name}")
        print(f"State: {response.state_info.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END recommender_v1_recommender_mark_insight_accepted]
