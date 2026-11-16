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

# [START recommender_v1beta1_recommender_recommendations_list]
from google.api_core import exceptions
from google.cloud import recommender_v1beta1


def list_recommendations(
    location_id: str, recommender_id: str, project_id: str
) -> None:
    """Lists recommendations for a specified project, location, and recommender.

    Args:
        location_id: The Google Cloud location or 'global' depending on the
          recommender (for example, 'global' or 'us-central1').
        recommender_id: The ID of the recommender (for example,
          'google.compute.instance.MachineTypeRecommender' or
          'google.iam.policy.Recommender').
        project_id: The Google Cloud project ID.
    """
    client = recommender_v1beta1.RecommenderClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/recommenders/{recommender_id}"
    )

    try:
        response = client.list_recommendations(parent=parent)
        count = 0
        for recommendation in response:
            count += 1
            print(f"Recommendation: {recommendation.name}")
            print(f"Description: {recommendation.description}")
            print(f"State: {recommendation.state_info.state}")
        if count == 0:
            print("No recommendations found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list recommendations: {error}")


# [END recommender_v1beta1_recommender_recommendations_list]
