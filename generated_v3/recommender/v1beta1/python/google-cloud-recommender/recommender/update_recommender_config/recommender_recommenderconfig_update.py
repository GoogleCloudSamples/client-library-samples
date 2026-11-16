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

# [START recommender_v1beta1_recommender_recommenderconfig_update]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1
from google.protobuf import field_mask_pb2


def update_recommender_config(
    project_id: str, location_id: str, recommender_id: str
) -> None:
    """Updates a recommender configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID (for example, 'us-central1-a').
        recommender_id: The recommender ID (for example,
            'google.compute.instance.MachineTypeRecommender').
    """
    client = recommender_v1beta1.RecommenderClient()

    # Recommenders such as MachineTypeRecommender require zone-level scope.
    if location_id == "global":
        location_id = "us-central1-a"

    config_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"recommenders/{recommender_id}/config"
    )

    try:
        # Fetch the current configuration to obtain the etag required for optimistic concurrency.
        current_config = client.get_recommender_config(name=config_name)

        recommender_config = recommender_v1beta1.RecommenderConfig(
            name=config_name,
            display_name="example-display-name",
            etag=current_config.etag,
        )
        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        response = client.update_recommender_config(
            recommender_config=recommender_config,
            update_mask=update_mask,
        )
        print(f"Updated recommender config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END recommender_v1beta1_recommender_recommenderconfig_update]
