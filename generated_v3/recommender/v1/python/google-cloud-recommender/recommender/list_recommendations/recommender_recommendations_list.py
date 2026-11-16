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

# [START recommender_v1_recommender_recommendations_list]
import google.api_core.exceptions
from google.cloud import recommender_v1


def list_recommendations(
    location_id: str, recommender_id: str, project_id: str
) -> None:
    """Lists recommendations for a specified recommender and location.

    Args:
        location_id: The Google Cloud location (for example, 'global' or 'us-central1').
        recommender_id: The ID of the recommender (for example, 'google.compute.instance.MachineTypeRecommender').
        project_id: The Google Cloud project ID.
    """
    client = recommender_v1.RecommenderClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/recommenders/"
        f"{recommender_id}"
    )

    request = recommender_v1.ListRecommendationsRequest(parent=parent)

    try:
        response = client.list_recommendations(request=request)
        count = 0
        for recommendation in response:
            print(f"Recommendation name: {recommendation.name}")
            print(f"Description: {recommendation.description}")
            print(f"State: {recommendation.state_info.state.name}")
            count += 1

        if count == 0:
            print("No recommendations found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")


# [END recommender_v1_recommender_recommendations_list]
