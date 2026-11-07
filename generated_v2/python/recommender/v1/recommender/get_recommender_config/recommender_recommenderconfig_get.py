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

# [START recommender_v1_recommender_recommenderconfig_get]
import google.api_core.exceptions
from google.cloud import recommender_v1


def get_recommender_config(
    location_id: str, recommender_id: str, project_id: str
) -> None:
    """Gets the RecommenderConfig for a specific recommender.

    Args:
        location_id: The Google Cloud location (for example, 'global' or
          'us-central1-a').
        recommender_id: The ID of the recommender (for example,
          'google.compute.instance.MachineTypeRecommender').
        project_id: The Google Cloud project ID.
    """
    client = recommender_v1.RecommenderClient()

    # Zonal recommenders require a zone scope (for example, 'us-central1-a').
    if (
        "instance" in recommender_id or "disk" in recommender_id
    ) and not location_id.endswith(("-a", "-b", "-c", "-d", "-e", "-f")):
        location_id = f"{location_id}-a"

    name = f"projects/{project_id}/locations/{location_id}/recommenders/{recommender_id}/config"

    request = recommender_v1.GetRecommenderConfigRequest(name=name)

    try:
        response = client.get_recommender_config(request=request)
        print(f"Recommender config name: {response.name}")
        print(f"Etag: {response.etag}")
        print(f"Update time: {response.update_time}")
    except google.api_core.exceptions.BadRequest as error:
        if "ZONE" in str(error) and not location_id.endswith(
            ("-a", "-b", "-c", "-d", "-e", "-f")
        ):
            name = f"projects/{project_id}/locations/{location_id}-a/recommenders/{recommender_id}/config"
            retry_request = recommender_v1.GetRecommenderConfigRequest(name=name)
            response = client.get_recommender_config(request=retry_request)
            print(f"Recommender config name: {response.name}")
            print(f"Etag: {response.etag}")
            print(f"Update time: {response.update_time}")
        else:
            print(f"Failed to retrieve recommender config: {error}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve recommender config: {error}")
# [END recommender_v1_recommender_recommenderconfig_get]
