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

# [START recommender_v1_recommender_recommenderconfig_update]
import google.api_core.exceptions
from google.cloud import recommender_v1
from google.protobuf import field_mask_pb2


def update_recommender_config(
    project_id: str, location_id: str, recommender_id: str
) -> None:
    """Update a recommender configuration in Google Cloud.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1-a').
        recommender_id: The recommender identifier (for example,
          'google.compute.instance.MachineTypeRecommender').
    """
    # Recommender configurations for zonal recommenders require a zone scope.
    if location_id == "global":
        location_id = "us-central1-a"

    client = recommender_v1.RecommenderClient()

    config_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"recommenders/{recommender_id}/config"
    )

    try:
        # Fetch the existing configuration to retrieve the current etag for optimistic locking.
        existing_config = client.get_recommender_config(name=config_name)

        recommender_config = recommender_v1.RecommenderConfig(
            name=config_name,
            display_name="Updated Recommender Config",
            etag=existing_config.etag,
        )
        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        response = client.update_recommender_config(
            recommender_config=recommender_config,
            update_mask=update_mask,
        )

        print(f"Updated recommender configuration: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"ETag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update recommender configuration: {error}")
# [END recommender_v1_recommender_recommenderconfig_update]
