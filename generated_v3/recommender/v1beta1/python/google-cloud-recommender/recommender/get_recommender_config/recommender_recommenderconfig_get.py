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

# [START recommender_v1beta1_recommender_recommenderconfig_get]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1


def get_recommender_config(
    location_id: str, recommender_id: str, project_id: str
) -> None:
    """Retrieves the configuration for a specific recommender.

    Args:
        location_id: The Google Cloud zone, region, or 'global' where the
          recommender config is located (for example, 'us-central1-a' or 'global').
        recommender_id: The ID of the recommender (for example,
          'google.compute.instance.MachineTypeRecommender').
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    # Zone-scoped recommenders require a zone location rather than a region.
    if location_id != "global" and len(location_id.split("-")) == 2:
        location_id = f"{location_id}-a"

    name = f"projects/{project_id}/locations/{location_id}/recommenders/{recommender_id}/config"

    client = recommender_v1beta1.RecommenderClient()
    request = recommender_v1beta1.GetRecommenderConfigRequest(name=name)

    try:
        response = client.get_recommender_config(request=request)
        print(f"Retrieved recommender config: {response.name}")
        print(
            f"Recommender generation config: {response.recommender_generation_config}"
        )
        print(f"ETag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve recommender config: {e}")
# [END recommender_v1beta1_recommender_recommenderconfig_get]
